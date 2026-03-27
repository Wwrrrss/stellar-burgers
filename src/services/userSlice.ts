import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { TAuthResponse } from '@api';
import { deleteCookie, setCookie } from '../utils/cookie';

interface IState {
  user: TUser | null;
  orders: TOrder[];
  isUserLoading: boolean;
  isOrdersLoading: boolean;
  error: string;
}

const initialState: IState = {
  user: null,
  orders: [],
  isUserLoading: false,
  isOrdersLoading: false,
  error: ''
};

export const loginUser = createAsyncThunk<
  TAuthResponse,
  TLoginData,
  { rejectValue: string }
>('user/login', async (data, { rejectWithValue }) => {
  try {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

export const registerUser = createAsyncThunk<
  TAuthResponse,
  TRegisterData,
  { rejectValue: string }
>('user/register', async (data, { rejectWithValue }) => {
  try {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  } catch (e) {
    return rejectWithValue((e as Error).message);
  }
});

export const getUser = createAsyncThunk('user/get', async () => {
  const res = await getUserApi();
  return res;
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => {
    const res = await updateUserApi(user);
    return res;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  const res = await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
  return res;
});

export const getOrders = createAsyncThunk('orders/get', async () => {
  const res = await getOrdersApi();
  return res;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isUserLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isUserLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isUserLoading = false;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error.message ?? 'Unknown error';
      }
    });

    builder.addCase(registerUser.pending, (state) => {
      state.isUserLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isUserLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isUserLoading = false;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error.message ?? 'Unknown error';
      }
    });

    builder.addCase(getUser.pending, (state) => {
      state.isUserLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isUserLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.isUserLoading = false;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.isUserLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isUserLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.isUserLoading = false;
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.isUserLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isUserLoading = false;
      state.user = null;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.isUserLoading = false;
    });

    builder.addCase(getOrders.pending, (state) => {
      state.isOrdersLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.isOrdersLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(getOrders.rejected, (state) => {
      state.isOrdersLoading = false;
    });
  }
});

export default userSlice.reducer;
