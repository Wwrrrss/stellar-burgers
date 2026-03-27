import { getIngredientsApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';
import { RootState } from './store';

interface IState {
  selectedIngredients: TIngredient[];
  allingredients: TIngredient[];
  ingredientModalData: TIngredient | null;
  bun: TIngredient | null;
  orderModalData: TOrder | null;
  isLoading: boolean;
  orderRequest: boolean;
}

const initialState: IState = {
  selectedIngredients: [],
  allingredients: [],
  ingredientModalData: null,
  orderModalData: null,
  bun: null,
  isLoading: false,
  orderRequest: false
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  async () => {
    const res = await getIngredientsApi();
    return res;
  }
);

export const postOrder = createAsyncThunk('order', async (_, { getState }) => {
  const state = (getState() as RootState).homePage;
  const data = state.selectedIngredients.map((e) => e._id);
  if (state.bun) {
    data.push(state.bun._id, state.bun._id);
  }
  const res = await orderBurgerApi(data);
  return res;
});

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addToSelected: (state, action) => {
      const ingredient = state.allingredients.find(
        (e) => e._id === action.payload
      );
      if (!ingredient) return;

      if (ingredient.type === 'bun') {
        state.bun = ingredient;
        return;
      }

      state.selectedIngredients.push(ingredient);
    },
    deleteFromSelected: (state, action) => {
      const ing = state.selectedIngredients.at(action.payload);
      if (!ing) return;
      state.selectedIngredients.splice(action.payload, 1);
    },
    deleteBun: (state) => {
      state.bun = null;
    },
    moveIngredient: (state, action) => {
      const index = action.payload.number;
      if (action.payload.direction === 'up') {
        [
          state.selectedIngredients[index],
          state.selectedIngredients[index - 1]
        ] = [
          state.selectedIngredients[index - 1],
          state.selectedIngredients[index]
        ];
      }
      if (action.payload.direction === 'down') {
        [
          state.selectedIngredients[index],
          state.selectedIngredients[index + 1]
        ] = [
          state.selectedIngredients[index + 1],
          state.selectedIngredients[index]
        ];
      }
    },
    closeModal: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(postOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.selectedIngredients = [];
        state.bun = null;
      })
      .addCase(postOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const {
  addToSelected,
  deleteFromSelected,
  deleteBun,
  moveIngredient,
  closeModal
} = constructorSlice.actions;
export default constructorSlice.reducer;
