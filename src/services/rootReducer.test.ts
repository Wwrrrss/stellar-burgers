import { rootReducer } from './store';
import ConstructorReducer from './constructorSlice/constructorSlice';
import feedReducer from './feedSlice/feedSlice';
import userReducer from './userSlice/userSlice';

describe('rootReducer', () => {
  it('rootReducer initialization', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      user: userReducer(undefined, { type: '@@INIT' }),
      feed: feedReducer(undefined, { type: '@@INIT' }),
      homePage: ConstructorReducer(undefined, { type: '@@INIT' })
    });
  });
});
