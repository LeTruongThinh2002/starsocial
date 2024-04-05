import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {thunk} from 'redux-thunk';
import {authReducer} from './auth/auth.reducer';
import messageReducer from './message/message.reducer';
import {postReducer} from './post/post.reducer';

const rootReducers = combineReducers({
  auth: authReducer,
  post: postReducer,
  message: messageReducer
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
