import { useFormik } from "formik";
import * as Yup from "yup";
import { AtSign, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


export default function LoginForm() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const base_api = import.meta.env.VITE_BASE_API;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  //Formik
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      // .min(8, "Password must be at least 8 characters")
      // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      // .matches(/[0-9]/, "Password must contain at least one number")
      // .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const py = {
          email: values.email,
          password: values.password,
        }
        const response = await axios.post(`${base_api}/login`, py);
        if (response) {
          const token = await response?.data?.data?.token
          const decodedUser = jwtDecode(token);
          
          console.log('login ini', token, decodedUser);
          dispatch(loginSuccess({
            user: decodedUser,
            token: token,
          }));
          navigate('/dashboard'); // Redirect jika login berhasil
        } else {
          setModalMessage(response.message); // Tampilkan pesan error jika gagal
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setModalMessage(error.response.data.message || "Login Failed. Please try again.");
        } else {
          setModalMessage("An unexpected error occurred. Please try again.");
        }
      } finally {
        setModalOpen(true);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full bg-white rounded-2xl overflow-hidden">
        <div className="xl:w-2/12 lg:w-2/12"></div>
        <div className="w-full xl:w-3/12 lg:w-3/12 md:w-12/12 sm:w-12/12 p-6 flex flex-col justify-center">
          <div className='flex justify-center space-x-2'>
            <img src="/login_icon.png" alt="" className='w-6 h-6 object-cover rounded-lg' />
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">SIMS PPOB</h2>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Masuk atau buat akun untuk memulai</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4 relative">
              <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              />
              {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
            </div>
            <div className="mb-4 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              />
              {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm">{formik.errors.password}</p>}
            </div>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Masuk
            </button>
          </form>
          <h6 className="text-sm mt-6 text-center text-gray-400 mb-6">
            Belum punya akun? Registrasi <Link className='text-red-600' to="/registration">disini</Link>
          </h6>


        </div>
        <div className="xl:w-1/12 lg:w-2/12"></div>
        <div className="hidden md:block md:w-6/12 h-screen bg-cover bg-center" style={{ backgroundImage: "url('/login_bg.png')" }}></div>
      </div>
      <Dialog open={modalOpen} handler={() => setModalOpen(false)}>
        <DialogHeader>Notification</DialogHeader>
        <DialogBody>{modalMessage}</DialogBody>
        <DialogFooter>
          <Button color="red" onClick={() => setModalOpen(false)}>Close</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}