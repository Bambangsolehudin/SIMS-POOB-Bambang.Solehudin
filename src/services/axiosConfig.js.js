import axios from 'axios';
import { store } from '../redux/store'; // Import Redux Store
import { logoutUser } from '../redux/actions/authActions'; // Import action logout dari Redux

// Set base URL untuk semua permintaan Axios
axios.defaults.baseURL = 'https://take-home-test-api.nutech-integrasi.com'; 

// Interceptor Request: Tambahkan token otomatis jika ada
axios.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token; // Ambil token dari Redux state
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Tambahkan Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor Response: Auto logout jika status 401
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logoutUser()); // Auto logout jika token kadaluarsa
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default axios;
