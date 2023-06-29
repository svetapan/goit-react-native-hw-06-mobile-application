import { combineReducers } from 'redux';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  users: userReducer,
  publications: publicationsReducer,
  // postSlise: postReduser,
});

export default rootReducer;