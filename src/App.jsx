import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Registrasi from './pages/Registasi';
import TopUp from './pages/TopUp';
import TopUpType from './pages/TopUpType';
import Transaction from './pages/Transaction';
import Akun from './pages/Akun';
import Dashboard from './pages/Dashboard';

import './index.css';
import './App.css'


const App = () => {
  
  const auth = useSelector((state) => state.auth);
  // const isAuth = auth?.user ? true : false;

  return (
    <Routes>
      {/* Test */}

      {/* Jika belum login, arahkan ke halaman Login */}
      <Route path="/login" element={auth?.user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/registration" element={auth?.user ? <Navigate to="/dashboard" /> : <Registrasi />} />
      <Route path="/dashboard" element={auth?.user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/TopUp" element={ auth?.user ? <TopUp /> : <Navigate to="/login" />} />
      <Route path="/TopUp/:id" element={auth?.user ? <TopUpType /> : <Navigate to="/login" />} />
      <Route path="/transaction" element={auth?.user ? <Transaction /> : <Navigate to="/login" />} />
      <Route path="/akun" element={auth?.user ? <Akun /> : <Navigate to="/login" />} />


      {/* Route default jika tidak ditemukan */}
      <Route path="/" element={<Navigate to={auth?.user ? "/dashboard" : "/login"} />} />
      {/* <Route path="/" element={<Home />} /> */}
    </Routes>
  );
};

export default App;
