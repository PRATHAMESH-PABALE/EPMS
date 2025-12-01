import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const res = await api.post("/auth/login", { username, password });
      const token = res.data.access_token;
      const user = res.data.user;
      onLogin(token, user);
      nav("/");
    } catch (e) {
      setErr(e.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PayrollPro</h1>
              <p className="text-xs text-gray-500">Enterprise Payroll Management</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Streamline Your Payroll Management
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Simplify payroll processing, automate calculations, and ensure compliance with our comprehensive enterprise solution.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Time Tracking</h3>
                  <p className="text-sm text-gray-600">Automated time and attendance monitoring</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Employee Portal</h3>
                  <p className="text-sm text-gray-600">Self-service access for all employees</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Analytics</h3>
                  <p className="text-sm text-gray-600">Real-time payroll insights and reports</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Secure & Compliant</h3>
                  <p className="text-sm text-gray-600">Bank-level security and tax compliance</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-gray-600">Companies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600">500K+</div>
                <div className="text-sm text-gray-600">Employees</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h3>
              <p className="text-gray-600">Sign in to access your payroll dashboard</p>
            </div>

            <form onSubmit={submit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {err && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {err}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                <span className="font-medium">Admin Access:</span> Register users via backend API at <code className="bg-gray-100 px-2 py-1 rounded">/api/auth/register</code> or use the seeding script.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <a href="#help" className="text-blue-600 hover:text-blue-700 transition-colors">
                Need Help?
              </a>
              <span className="text-gray-300">|</span>
              <a href="#privacy" className="text-blue-600 hover:text-blue-700 transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-sm">© 2024 PayrollPro. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a href="#terms" className="hover:text-blue-600 transition-colors">Terms</a>
              <a href="#security" className="hover:text-blue-600 transition-colors">Security</a>
              <a href="#support" className="hover:text-blue-600 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}