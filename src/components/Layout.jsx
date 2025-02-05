// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  // Mengambil status dark mode dari localStorage
  // const [isDarkMode, setIsDarkMode] = useState(() => {
  //   return localStorage.getItem('theme') === 'light'; // Defaultnya dark mode jika ada di localStorage
  // });

  // // Fungsi untuk toggle dark mode
  // const toggleDarkMode = () => {
  //   setIsDarkMode(prev => !prev);
    
  // };

  // Menyimpan status tema di localStorage dan menambahkan class 'dark' ke <html> 
  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add('dark');
  //     localStorage.setItem('theme', 'dark'); // Simpan di localStorage
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //     localStorage.setItem('theme', 'light'); // Simpan di localStorage
  //   }
  // }, [isDarkMode]);
  const location = useLocation();


  const routingData = [
    {
      path: '/TopUp',
      name: 'TopUp',
    },
    {
      path: '/transaction',
      name: 'Transaction',
    },
    {
      path: '/akun',
      name: 'Akun',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-800">
      {/* Header */}
      <header className="px-8 py-5 text-white shadow-lg shadow-b bg-white">
        <div className="flex justify-between items-center" >
          
          <Link to='/dashboard' className='flex align-items-center space-x-2'>
            <img className='w-6 h-6 object-cover rounded-lg ' src="/login_icon.png" alt="" />
            <h6 className="text-lg font-semibold  text-gray-800">
              SIMS PPOB
            </h6>
          </Link>

          <div className='flex align-items-center space-x-4'>
            {
              routingData.map((item, index) => {
                return (
                  <Link key={index} to={item?.path} className='flex align-items-center space-x-2'>
                    <h6 className={`text-lg ${location.pathname == item?.path ? 'text-red-600' : 'text-gray-800'} `}>
                      {item?.name}
                    </h6>
                  </Link>
                )
              })
            }
            
          </div>
          
          {/* <button
            onClick={toggleDarkMode}
            className="text-yellow-400 p-2 rounded-full focus:outline-none"
          >
            {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button> */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="shadow-xl p-4 text-white text-center">
        <p className="text-sm text-slate-800 dark:text-white">&copy; 2025 Bambang Solehudin</p>
      </footer>
    </div>
  );
};

export default Layout;




