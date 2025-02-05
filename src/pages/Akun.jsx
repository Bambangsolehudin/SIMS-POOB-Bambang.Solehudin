import { useState, useEffect } from "react";
import { Pencil, User } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/reducers/authSlice";
import axios from 'axios'
import { useFormik } from 'formik';
import * as Yup from 'yup';



import Layout from '../components/Layout';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";



export default function Profile() {
    const base_api = 'https://take-home-test-api.nutech-integrasi.com';
    

    const auth = useSelector((state) => state.auth.user);
    const token = auth?.token
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [profileImage, setProfileImage] = useState(''); // Gambar default
    const [profile, setProfile] = useState('');

    const [isEdit, setIsEdit] = useState(false)
    // Modal
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");


    const handleLogout = () => {
        dispatch(logout());
        navigate("/"); 
      };
    const fetchProfile = async () => {
        try {
        const token = auth?.token
        const response = await axios.get(`${base_api}/profile`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        if (response?.data) {
            console.log(response?.data);
        }
        setProfile(response?.data?.data); // Simpan data profile ke state
        } catch (error) {
            console.log(error);
        } 
    };

    useEffect(() => {
        // console.log('profile', profile);
        // setEmail(profile?.email)
        // setFirstName(profile?.first_name)
        // setLastName(profile?.last_name)

        // const dataImage = profile?.profile_image?.split('/').pop() === 'null' ? '/user.png' : profile?.profile_image
        // console.log('dataImage', dataImage);
        // setProfileImage(dataImage)
        if (profile) {
            formik.setValues({
                firstName: profile?.first_name || '',
                lastName: profile?.last_name || '',
                email: profile?.email || '',
            });
            setProfileImage(profile?.profile_image?.split('/').pop() === 'null' ? '/user.png' : profile?.profile_image);
        }
    },[profile])

    useEffect(() => {
        fetchProfile();
    }, [])

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Nama depan wajib diisi'),
            lastName: Yup.string().required('Nama belakang wajib diisi'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.put(`${base_api}/profile/update`, {
                    first_name: values.firstName,
                    last_name: values.lastName,
                }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setModalMessage(response?.data?.message ?? 'Update Berhasil');
                fetchProfile();
                setIsEdit(false);
            } catch (error) {
                setModalMessage(error.response?.data?.message || "Terjadi kesalahan");
            } finally {
                setModalOpen(true);
                setIsEdit(false)
            }
        }
    });
    


    const handleImageChange = async (event) => {
        const file = event.target.files[0];
    
        if (!file) {
            setModalMessage("No file selected.");
            setModalOpen(true);
            return;
        }
    
        console.log(file);
    
        const formData = new FormData();
        formData.append("profile_image", file);

        try {
            const response = await axios.put(`${base_api}/profile/image`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
    
            if (response?.data?.imageUrl) {
                setProfileImage(response.data.imageUrl); 
                setModalMessage(response?.data?.message ?? 'Update Berhasil');
            } else {
                setModalMessage("Update failed, no imageUrl in response.");
            }
    
            // Fetch profile after update
            fetchProfile();
    
        } catch (error) {
            if (error.response && error.response.data) {
                setModalMessage(error.response.data.message || "Registration Failed. Please try again.");
            } else {
                setModalMessage("An unexpected error occurred. Please try again.");
            }
        } finally {
            setModalOpen(true);
        }
    };
    

    const handleSave = () => {
        formik.handleSubmit();
    };
  return (
    <Layout>
        <div className="flex flex-col items-center min-h-screen p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-8/12 max-w-2xl text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
            <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border"
            />
            <label
                htmlFor="profileInput"
                className="absolute bottom-0 right-0 border border-gray-400 bg-white p-1 rounded-full shadow-md cursor-pointer"
            >
                <Pencil size={16} color='black' className="text-gray-500" />
            </label>
            <input
                id="profileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
            />
            </div>
            <h2 className="text-xl font-semibold mb-4">{formik.values.firstName} {formik.values.lastName}</h2>

            <div className="text-left">
                <label className="block text-gray-600 text-sm">Email</label>
                <div className="flex items-center border rounded-lg px-4 py-2 bg-gray-100 mb-4">
                    <span className="mr-2">@</span>
                    <input
                    type="text"
                    disabled 
                    {...formik.getFieldProps('email')}
                    className="bg-transparent w-full outline-none"
                    />
                </div>
            
                <label className="block text-gray-600 text-sm">Nama Depan</label>
                <div className={`relative flex items-center border rounded-md p-2 my-4 ${!isEdit ? 'bg-gray-100' : ''}`}>
                    <User className="text-gray-500 mr-2" size={20} />
                    <input disabled={!isEdit} {...formik.getFieldProps('firstName')} type="text" className={`${!isEdit?'bg-transparent':''} w-full outline-none`}  />
                </div>
                {formik.touched.firstName && formik.errors.firstName ? <div className="text-red-500 text-sm">{formik.errors.firstName}</div> : null}
                
                <label className="block text-gray-600 text-sm">Nama Belakang</label>
                <div className={`relative flex items-center border rounded-md p-2 my-4 ${!isEdit ? 'bg-gray-100' : ''}`}>
                    <User className="text-gray-500 mr-2" size={20} />
                    <input disabled={!isEdit} {...formik.getFieldProps('lastName')} type="text" className={`${!isEdit?'bg-transparent':''} w-full outline-none`}  />
                </div>
                {formik.touched.lastName && formik.errors.lastName ? <div className="text-red-500 text-sm">{formik.errors.lastName}</div> : null}
            
            </div>
            
            {
                !isEdit && (
                    <div>
                        <button 
                            onClick={(e) => {e.preventDefault; setIsEdit(true)}}
                            className="w-full py-2 rounded-lg border text-red-500 hover:bg-gray-100 mb-2"
                        >
                            Edit Profile
                        </button>
                        <button onClick={handleLogout} className="w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
                            Logout
                        </button>
                    </div>
                )
            }
            {
                isEdit && (
                    <button type="button" onClick={handleSave} disabled={!formik.isValid} className={`w-full py-2 rounded-lg text-white mt-4 ${formik.isValid ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'}`}>Simpan</button>
                )
            }
            
        </div>
        <Dialog open={modalOpen} handler={() => setModalOpen(false)}>
            <DialogHeader>Notification</DialogHeader>
            <DialogBody>{modalMessage}</DialogBody>
            <DialogFooter>
            <Button color="red" onClick={() => setModalOpen(false)}>Close</Button>
            </DialogFooter>
        </Dialog>
        </div>
    </Layout>
  );
}