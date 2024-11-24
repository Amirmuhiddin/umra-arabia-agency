import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminLayout from './components/admin/AdminLayout';
import LoginPage from './components/admin/LoginPage';
import OrdersPage from './components/admin/OrdersPage';
import ContentPage from './components/admin/ContentPage';
import PackagesPage from './components/admin/PackagesPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="orders" element={<OrdersPage />} />
        <Route path="content" element={<ContentPage />} />
        <Route path="packages" element={<PackagesPage />} />
      </Route>
    </Routes>
  );
};

export default App;