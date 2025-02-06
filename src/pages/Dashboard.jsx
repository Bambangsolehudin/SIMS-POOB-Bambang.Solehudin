import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios'


import Layout from '../components/Layout';
import MainProfile from '../components/MainProfile'
import "swiper/css";


const Home = () => {

  const auth = useSelector((state) => state.auth.user);
  const base_api = import.meta.env.VITE_BASE_API;

  const [services, setServices] = useState(null);
  const [banner, setBanner] = useState(null);


  //function
  const fetchServices = async () => {
    try {
      const token = auth?.token
      const response = await axios.get(`${base_api}/services`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data) {
        console.log('services', response?.data?.data);
        setServices(response?.data?.data); // Simpan data profile ke state
        console.log(services);
      }
    } catch (err) {
      console.log(err.response?.data?.message || "Gagal mengambil profil");
    }
  };
  const fetchBanner = async () => {
    try {
      const token = auth?.token
      const response = await axios.get(`${base_api}/banner`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data) {
        console.log('banner', response?.data?.data);
        setBanner(response?.data?.data); // Simpan data profile ke state
        console.log(banner);
      }

    } catch (err) {
      console.log(err.response?.data?.message || "Gagal mengambil profil");
    }
  };


  // UseEffect
  useEffect(() => {
    fetchServices();
    fetchBanner();
  }, [])
  

  return (
    <Layout>
    <div className="min-h-screen bg-white p-6">

      <MainProfile />

      {/* Services */}
      <div className="grid grid-cols-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-12 lg:grid-cols-12  gap-2 mt-6">
        {services && services.map((service, index) => (
          <Link to={`/TopUp/${service.service_code}?name=${service?.service_name}&tarif=${service?.service_tariff}`} key={index} className="flex flex-col items-center bg-white p-4 rounded-lg">
            <img src={service.service_icon} alt="" />
            <p className="mt-2 text-sm text-center">{service?.service_name}</p>
          </Link>
        ))}
      </div>

      {/* Promo Carousel */}
      <h3 className="mt-8 text-lg font-semibold">Temukan promo menarik</h3>

      <Swiper spaceBetween={10} slidesPerView={4.5} className="mt-4"
        breakpoints={{
          120: { slidesPerView: 1 },  // Layar kecil (HP)
          320: { slidesPerView: 1 },  // Layar kecil (HP)
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 }
        }}
      
      >
        { banner && banner.map((promo, index) => (
          <SwiperSlide key={index}>
            <div className='w-full flex justify-center'> 
              <img src={promo?.banner_image} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </Layout>
  );
};

export default Home;



