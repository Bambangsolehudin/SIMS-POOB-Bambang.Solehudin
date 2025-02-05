// src/components/Navbar.js

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Agentic Dashboard</h1>
      <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
