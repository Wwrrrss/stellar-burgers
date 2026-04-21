import reducer, {
  addToSelected,
  deleteFromSelected,
  deleteBun,
  moveIngredient,
  closeModal,
  fetchIngredients
} from './constructorSlice';
const bun = {
  _id: '1',
  name: 'bun',
  type: 'bun',
  proteins: 5,
  fat: 5,
  carbohydrates: 5,
  calories: 5,
  price: 5,
  image: '',
  image_large: '',
  image_mobile: ''
};
const sauce = {
  _id: '2',
  name: 'sauce',
  type: 'sauce',
  proteins: 5,
  fat: 5,
  carbohydrates: 5,
  calories: 5,
  price: 5,
  image: '',
  image_large: '',
  image_mobile: ''
};
const main = {
  _id: '3',
  name: 'main',
  type: 'main',
  proteins: 5,
  fat: 5,
  carbohydrates: 5,
  calories: 5,
  price: 5,
  image: '',
  image_large: '',
  image_mobile: ''
};

const initialState = {
  selectedIngredients: [],
  allingredients: [bun, sauce, main],
  ingredientModalData: null,
  orderModalData: null,
  bun: null,
  isLoading: false,
  orderRequest: false
};

describe('constructor slice', () => {
  describe('addToSelected', () => {
    test('add bun', () => {
      const state = reducer(initialState, addToSelected('1'));
      expect(state.bun).toEqual(bun);
    });
    test('add ingredient to selectedIngredients', () => {
      const state = reducer(initialState, addToSelected('2'));
      expect(state.selectedIngredients[0]).toEqual(sauce);
    });
  });
  describe('deleteFromSelected', () => {
    test('deleteBun', () => {
      const state = reducer(initialState, addToSelected('1'));
      const newState = reducer(state, deleteBun());
      expect(newState.bun).toBe(null);
    });
    test('deleteFromSelected', () => {
      const state = reducer(initialState, addToSelected('2'));
      const newState = reducer(state, deleteFromSelected(0));
      expect(newState.selectedIngredients).toEqual([]);
    });
  });
  describe('moveIngredient', () => {
    test('move up', () => {
      const state = {
        ...initialState,
        selectedIngredients: [sauce, main]
      };
      const newState = reducer(
        state,
        moveIngredient({ number: 1, direction: 'up' })
      );
      expect(newState.selectedIngredients).toEqual([main, sauce]);
    });
    test('move down', () => {
      const state = {
        ...initialState,
        selectedIngredients: [sauce, main]
      };
      const newState = reducer(
        state,
        moveIngredient({ number: 0, direction: 'down' })
      );
      expect(newState.selectedIngredients).toEqual([main, sauce]);
    });
  });
  test('close modal', () => {
    const state = {
      ...initialState,
      orderRequest: true,
      orderModalData: {
        _id: '9',
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: ['']
      }
    };
    const newState = reducer(state, closeModal());
    expect(newState.orderModalData).toBeNull();
    expect(newState.orderRequest).toBe(false);
  });
  describe('extraReducers', () => {
    test('pending', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });
    test('fulfilled', () => {
      const payload = [bun];
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.allingredients).toEqual(payload);
    });
    test('rejected', () => {
      const action = { type: fetchIngredients.rejected.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
    });
  });
});
