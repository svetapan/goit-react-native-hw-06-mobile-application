import { combineReducers } from 'redux';
import userSlice from './slices/userReducer';
import firebaseReducer from './slices/firebaseReducer';
// import { postsSlice } from './slices/postsReducer';

const rootReducer = combineReducers({
  user: userSlice,
  firebase: firebaseReducer,
  // posts: postsSlice,
  // postItem: postItemReducer,
});

export default rootReducer;