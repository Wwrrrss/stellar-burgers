import reducer, { fetchFeed } from './feedSlice';
import { TOrder } from '@utils-types';

describe('feedSlice', () => {
  const createState = () => ({
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false
  });
  const order: TOrder = {
    _id: '1',
    status: 'done',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 1,
    ingredients: []
  };

  test('pending', () => {
    const state = reducer(createState(), { type: fetchFeed.pending.type });
    expect(state.isLoading).toBe(true);
  });
  test('fulfilled', () => {
    const payload = {
      orders: [order],
      total: 1,
      totalToday: 2
    };
    const state = reducer(createState(), {
      type: fetchFeed.fulfilled.type,
      payload
    });
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual([order]);
    expect(state.total).toBe(1);
    expect(state.totalToday).toBe(2);
  });
  test('rejected', () => {
    const state = {
      ...createState(),
      isLoading: true
    };
    const newState = reducer(state, { type: fetchFeed.rejected.type });
    expect(newState.isLoading).toBe(false);
  });
});
