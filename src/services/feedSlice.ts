import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
}

const initialState: IState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

export const fetchFeed = createAsyncThunk('feed/fetch', async () => {
  const res = await getFeedsApi();
  return res;
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export default feedSlice.reducer;
