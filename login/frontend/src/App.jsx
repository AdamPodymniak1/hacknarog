import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { authApi } from './api'; 

function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authApi.tokenObtainPair(form);
      localStorage.setItem('access_token', data.access);
      navigate('/');
    } catch (err) { alert("Login Failed"); }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            className="w-full border p-2 rounded" 
            placeholder="Username" 
            onChange={e => setForm({...form, username: e.target.value})} 
          />
          <input 
            type="password" 
            className="w-full border p-2 rounded" 
            placeholder="Password" 
            onChange={e => setForm({...form, password: e.target.value})} 
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Sign In
          </button>
        </form>
        <Link to="/register" className="block mt-4 text-center text-blue-500 text-sm">
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
}

function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await authApi.backendApiSignup(form);
      alert("Account created! Please login.");
      navigate('/login');
    } catch (err) { alert("Signup Failed"); }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input className="w-full border p-2 rounded" placeholder="Username" onChange={e => setForm({...form, username: e.target.value})} />
          <input className="w-full border p-2 rounded" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
          <input type="password" className="w-full border p-2 rounded" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Create Account
          </button>
        </form>
        <Link to="/login" className="block mt-4 text-center text-blue-500 text-sm">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  return token ? children : <Navigate to="/login" />;
};

function Dashboard() {
  const logout = () => {
    localStorage.removeItem('access_token');
    window.location.reload();
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard 🍻</h1>
      <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}