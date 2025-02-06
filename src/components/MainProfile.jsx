import { useState, useEffect } from "react";
import "swiper/css";
import { useSelector } from 'react-redux';
import axios from 'axios'
import { Eye, EyeOff } from "lucide-react";

const MainProfile = () => {
    const auth = useSelector((state) => state.auth.user);
    const base_api = import.meta.env.VITE_BASE_API;


    const [balanceHidden, setBalanceHidden] = useState(true);
    const [profile, setProfile] = useState(null);
    const [balance, setBalance] = useState(null);

    function ubahKeRupiah(angka) {
        return angka.toLocaleString('id-ID');
    }
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
        } catch (err) {
        console.log(err.response?.data?.message || "Gagal mengambil profil");
        }
    };
    const fetchBalance = async () => {
        try {
        const token = auth?.token
        const response = await axios.get(`${base_api}/balance`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        if (response?.data) {
            console.log('Balance', response?.data);
            setBalance(response?.data?.data); // Simpan data profile ke state
            console.log(balance);
            
        }

        } catch (err) {
        console.log(err.response?.data?.message || "Gagal mengambil profil");
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchBalance();
    }, [])


    return (
        <div className="flex flex-col xl:flex-row lg:flex-row xl:justify-between lg:justify-between ">
            <div className='sm:w-full md:w-full' >
                <img
                    src={profile?.profile_image?.split('/').pop() === 'null' ? '/user.png' : profile?.profile_image}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <p className="text-xl text-gray-500">Selamat datang,</p>
                    <h2 className="text-4xl font-semibold"> {profile ? (profile?.first_name + ' '+ profile?.last_name) : '-'} </h2>
                </div>
            </div>

            {/* Balance Card */}
            <div className=" bg-red-500 xl:w-1/2 sm:w-full md:w-full text-white p-6 rounded-xl flex flex-col items-start">
                <p>Saldo anda</p>
                <p className="text-2xl font-bold">
                    Rp {balanceHidden ? "••••••••" : ubahKeRupiah(balance?.balance)}
                </p>
                <button
                onClick={() => setBalanceHidden(!balanceHidden)}
                className="mt-2 text-sm underline"
                >
                {balanceHidden ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );
};

export default MainProfile;



