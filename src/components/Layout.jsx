import { Link, useLocation } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
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
    <div className="flex flex-col min-h-screen bg-white  dark:bg-gray-800 ">
      {/* Header */}
      <header className="px-8 fixed top-0 left-0 w-full mb-20 py-5 z-50 text-white shadow-lg shadow-b bg-white isolation-isolate">
        <div className="flex justify-between items-center" >
          
          <Link to='/dashboard' className='flex items-center space-x-2'>
            <img className='h-8 xl:w-6 xl:h-6 lg:w-6 lg:h-6 object-cover rounded-lg ' src="/login_icon.png" alt="" />
            <h6 className="text-lg d-non font-semibold invisible xl:visible lg:visible md:visible  text-gray-800">
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
      <main className="flex-grow container mx-auto p-6 xl:p-8 lg:p-8 md:p-8 xl:mt-20 lg:mt-20 md:mt-20 mt-24">
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




