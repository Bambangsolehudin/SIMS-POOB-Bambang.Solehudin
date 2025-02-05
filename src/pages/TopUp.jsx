import Layout from '../components/Layout';
import { useState } from "react";
import MainProfile from '../components/MainProfile';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";




//material tailwind

const TopUp = () => {
  const auth = useSelector((state) => state.auth.user);
  const base_api = import.meta.env.VITE_BASE_API;

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");


  const [amount, setAmount] = useState("");
  const [isValid, setIsValid] = useState(false);

  
  const presetAmounts = [10000, 20000, 50000, 100000, 250000, 500000];

  const [refreshKey, setRefreshKey] = useState(0);

  const handleInputChange = (value) => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || "";
    setAmount(numericValue);
    setIsValid(numericValue >= 10000 && numericValue <= 1000000);
  };

  const handleTopUp = async () => {
    if (!isValid) return;
    try {
      const token = auth?.token
      const payload = {
        top_up_amount: amount
      }
      const response = await axios.post(`${base_api}/topup`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
      });

      console.log(response?.data);
      setModalMessage(response?.data?.message ?? 'Topup Berhasil');
      setRefreshKey(prevKey => prevKey + 1);

      } catch (error) {
        if (error.response && error.response.data) {
          setModalMessage(error.response.data.message || "Registration Failed. Please try again.");
        } else {
          setModalMessage("An unexpected error occurred. Please try again.");
        }
      } finally {
        setModalOpen(true);
        setAmount("")
      }
  };

  
  

  return (
    <Layout>
      <div className="min-h-screen flex justify-center bg-white p-6">
      <div className='w-10/12'>

        <MainProfile key={refreshKey} />
        <div className='my-14'>
          <span className="text-xl font-semibold mb-4">Silahkan masukan </span> <br />
          <span className="text-3xl font-semibold">Nominal Top Up</span>
        </div>
        <div className="flex align-items-center justify-between mt-6">
            <div className='w-2/3'>
              <input
                type="text"
                value={amount.toLocaleString("id-ID")}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Masukkan nominal Topup"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none mb-4"
              />
              <button
                onClick={handleTopUp}
                disabled={!isValid}
                className={`w-full py-2 rounded-lg text-white transition ${isValid ? "bg-red-500 hover:bg-red-600" : "bg-gray-300 cursor-not-allowed"}`}
              >
                Top Up
              </button>
            </div>
            
            <div className="className='w-1/3' grid grid-cols-3 gap-2 mb-4">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleInputChange(amt.toString())}
                  className="border px-4 py-2 rounded-lg hover:bg-gray-200 text-center"
                >
                  Rp{amt.toLocaleString("id-ID")}
                </button>
              ))}
            </div>
        </div>
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
};

export default TopUp;



