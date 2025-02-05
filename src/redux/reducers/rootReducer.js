import { combineReducers } from 'redux';
// import userReducer from './userReducer';
import authReducer from './authSlice';

const rootReducer = combineReducers({
//   user: userReducer, // State untuk user
  auth: authReducer, // State untuk autentikasi
});

export default rootReducer;