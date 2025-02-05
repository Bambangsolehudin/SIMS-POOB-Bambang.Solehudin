import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { AtSign, User, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function RegisterForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const api = 'https://take-home-test-api.nutech-integrasi.com'


  

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
      onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(`${api}/registration`, {
          email: values.email,
          first_name: values.firstName,
          last_name: values.lastName,
          password: values.password,
        });
        console.log(response);
        
        setModalMessage("Registrasi Berhasil");
        resetForm();
      } catch (error) {
        if (error.response && error.response.data) {
          setModalMessage(error.response.data.message || "Registration Failed. Please try again.");
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
      <div className="flex w-full max-w-5xl bg-white rounded-2xl overflow-hidden">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>
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
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              />
              {formik.touched.firstName && formik.errors.firstName && <p className="text-red-500 text-sm">{formik.errors.firstName}</p>}
            </div>
            <div className="mb-4 relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              />
              {formik.touched.lastName && formik.errors.lastName && <p className="text-red-500 text-sm">{formik.errors.lastName}</p>}
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
            <div className="mb-6 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>}
            </div>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Registrasi
            </button>
          </form>
          <h6 className="text-sm mt-6 text-center text-gray-400 mb-6">
            Sudah ada akun? Login <Link className="text-red-600" to="/login">disini</Link>
          </h6>
        </div>
        <div className="hidden md:block md:w-2/3 h-screen bg-cover bg-center" style={{ backgroundImage: "url('/login_bg.png')" }}></div>
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
