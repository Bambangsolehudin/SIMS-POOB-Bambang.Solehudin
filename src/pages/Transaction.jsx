import Layout from '../components/Layout';
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios'
// moment js
import moment from 'moment';
import 'moment/locale/id'; 
moment.locale('id'); 


import MainProfile from '../components/MainProfile';

//material tailwind

const Transaction = () => {
  const auth = useSelector((state) => state.auth.user);
  const base_api = import.meta.env.VITE_BASE_API;
  const [transactions, setTransactions] = useState([])
  const [offset, setOffset] = useState(0)

  const fetchTransaction = async () => {
    try {
      const token = auth?.token
      const response = await axios.get(`${base_api}/transaction/history?offset=${offset}&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data) {
        console.log('transactions', response?.data?.data);
        const newData = response?.data?.data?.records
        setTransactions( [...transactions, ...newData]);
        console.log(transactions);
      }

    } catch (err) {
      console.log(err.response?.data?.message || "Gagal mengambil profil");
    }
  }
  const getDate = (val) => {
    const tanggal = moment(val);
    const hasil = tanggal.format('DD MMMM YYYY HH:mm') + ' WIB';
    return hasil;
  }

  useEffect(() => {
    fetchTransaction();
  }, [])

  return (
    <Layout>
      <div className="min-h-screen flex justify-center bg-white p-6">
      <div className='w-10/12'>

        <MainProfile />
      
        <div className="flex align-items-center justify-between mt-20">
            <div className='w-full'>
              <h1 className="text-xl font-semibold mb-4">Semua Transaksi</h1>
              {transactions.map((transaction, index) => (
                  <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-4">
                      <div className="flex justify-between items-center">
                          <div className={`${transaction?.transaction_type === 'TOPUP' ? 'text-green-600' : 'text-red-600'} font-semibold`}>Rp. {transaction?.total_amount?.toLocaleString("id-ID")}</div>
                          <div className="text-gray-500 text-sm">{transaction?.description}</div>
                      </div>
                      <div className="text-gray-400 mt-2 text-sm">{getDate(transaction?.created_on)}</div>
                  </div>
              ))}
              <div className="text-center mt-4">
                  <button onClick={
                    (e) => {
                      e.preventDefault();
                      setOffset(prevOffset => prevOffset + 1);
                      fetchTransaction();
                    }
                  } className="text-red-500">Show more</button>
              </div>
            </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Transaction;



