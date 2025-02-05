import { loginSuccess, loginStart, loginFailure, logout } from '../reducers/authSlice';
import { jwtDecode } from "jwt-decode";


import axios from 'axios';

// Fungsi Login
export const loginUser = (payload) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const base_api = 'https://take-home-test-api.nutech-integrasi.com'
    const response = await axios.post(`${base_api}/login`, payload  );
    
    const token = response.data.token
    const decodedUser = jwtDecode(token);
    
    console.log('ini response', response);
    console.log('ini response', token);
    console.log('ini response', decodedUser);



    dispatch(loginSuccess({
      user: decodedUser,
      token: token,
    }));
    return true;
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Fungsi Logout
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(logout());
  } catch (error) {
    console.error('Logout error:', error);
  }
};
