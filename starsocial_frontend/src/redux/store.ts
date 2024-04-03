import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk} from 'redux-thunk';
import {authReducer} from './auth/auth.reducer';
import {postReducer} from './post/post.reducer';

const rootReducers = combineReducers({
  auth: authReducer,
  post: postReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
