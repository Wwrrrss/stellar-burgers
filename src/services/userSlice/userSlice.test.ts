import reducer, {
  loginUser,
  registerUser,
  getUser,
  updateUser,
  logoutUser,
  getOrders
} from './userSlice';

const initialState = {
  user: null,
  orders: [],
  isUserLoading: false,
  isOrdersLoading: false,
  error: ''
};

describe('userSlice', () => {
    describe('loginUser', () => {
        test('pending', () => {
            const action = { type: loginUser.pending.type }
            const state = reducer(initialState, action)

            expect(state.isUserLoading).toBe(true)
        })
        test('fulfilled', () => {
            const mockUser = { email: 'email@email.com', name: 'Name' }
            const action = {
                type: loginUser.fulfilled.type,
                payload: { user: mockUser }
            }
            const state = reducer(initialState, action)

            expect(state.isUserLoading).toBe(false)
            expect(state.user).toEqual(mockUser)
        })
        test('rejected', () => {
            const action = {
                type: loginUser.rejected.type,
                payload: 'error'
            }
            const state = reducer(
                { ...initialState, isUserLoading: true },
                action
            )

            expect(state.isUserLoading).toBe(false)
            expect(state.error).toBe('error')
        })
    })
    describe('registerUser', () => {
        test('fulfilled', () => {
            const mockUser = { email: 'new@email.com', name: 'newName' }
            const action = {
                type: registerUser.fulfilled.type,
                payload: { user: mockUser }
            }
            const state = reducer(initialState, action)

            expect(state.user).toEqual(mockUser)
        })
    })
    describe('getUser', () => {
        test('fulfilled', () => {
            const mockUser = { email: 'user@email.com', name: 'getUser' }
            const action = {
                type: getUser.fulfilled.type,
                payload: { user: mockUser }
            }
            const state = reducer(initialState, action)

            expect(state.user).toEqual(mockUser)
            expect(state.isUserLoading).toBe(false)
        })
    })
    describe('logoutUser', () => {
        test('fulfilled', () => {
            const state = {
                ...initialState,
                user: { email: 'email@email.com', name: 'Name' }
            }
            const action = { type: logoutUser.fulfilled.type }
            const newState = reducer(state, action)

            expect(newState.user).toBeNull()
        })
    })
    describe('getOrders', () => {
        test('fulfilled', () => {
            const orders = [{ id: 1 }, { id: 2 }]

            const action = {
                type: getOrders.fulfilled.type,
                payload: orders
            }

            const state = reducer(initialState, action)

            expect(state.orders).toEqual(orders)
            expect(state.isOrdersLoading).toBe(false)
        })
    })
})