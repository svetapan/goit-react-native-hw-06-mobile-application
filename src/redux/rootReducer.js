import { combineReducers } from 'redux';
import userSlice from './slices/userSlice';
import postsSlice from './slices/postsSlice';
import commentSlice from './slices/commentSlice';

const rootReducer = combineReducers({
  user: userSlice,
  post: postsSlice,
  comment: commentSlice
});

export default rootReducer;
