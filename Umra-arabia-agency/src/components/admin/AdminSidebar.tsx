import React from 'react';
import { NavLink } from 'react-router-dom';
import { Package, Image, FileText, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold text-[#20392B]">Admin Panel</h1>
      </div>
      <nav className="mt-8">
        <NavLink
          to="/admin/packages"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 ${
              isActive ? 'bg-gray-50 text-[#20392B] border-r-4 border-[#C6A869]' : ''
            }`
          }
        >
          <Package className="w-5 h-5" />
          Packages
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 ${
              isActive ? 'bg-gray-50 text-[#20392B] border-r-4 border-[#C6A869]' : ''
            }`
          }
        >
          <FileText className="w-5 h-5" />
          Orders
        </NavLink>
        <NavLink
          to="/admin/content"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 ${
              isActive ? 'bg-gray-50 text-[#20392B] border-r-4 border-[#C6A869]' : ''
            }`
          }
        >
          <Image className="w-5 h-5" />
          Content
        </NavLink>
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50"
        >
          <Home className="w-5 h-5" />
          View Site
        </NavLink>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;