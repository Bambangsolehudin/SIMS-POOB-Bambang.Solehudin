// src/components/Sidebar.js
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      <ul>
        <li className="mb-6">
          <Link to="/dashboard" className="text-lg hover:text-blue-400">Dashboard</Link>
        </li>
        <li className="mb-6">
          <Link to="/settings" className="text-lg hover:text-blue-400">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
