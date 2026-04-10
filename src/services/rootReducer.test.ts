import { rootReducer } from './store';
import ConstructorReducer from './constructorSlice/constructorSlice';
import feedReducer from './feedSlice/feedSlice';
import userReducer from './userSlice/userSlice';

describe('rootReducer', () => {
  it('rootReducer initialization', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state.user).toEqual(
      userReducer(undefined, { type: '@@INIT' })
    );

    expect(state.feed).toEqual(
      feedReducer(undefined, { type: '@@INIT' })
    );

    expect(state.homePage).toEqual(
      ConstructorReducer(undefined, { type: '@@INIT' })
    );
  });
});
