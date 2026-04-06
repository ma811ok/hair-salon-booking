import React, { useState, useEffect } from 'react';
import { Users, Calendar, DollarSign, TrendingUp, Edit, Trash2, Check, X } from 'lucide-react';
import { adminAPI } from '../services/api';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'dashboard') {
        const statsRes = await adminAPI.getStats();
        setStats(statsRes.data);
      } else if (activeTab === 'users') {
        const usersRes = await adminAPI.getUsers();
        setUsers(usersRes.data);
      } else if (activeTab === 'bookings') {
        const bookingsRes = await adminAPI.getAllBookings();
        setBookings(bookingsRes.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminAPI.deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="text-white" size={24} />
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-primary mt-4">{value}</p>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-4xl font-bold text-primary mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b">
          {['dashboard', 'users', 'bookings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-4 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && stats && (
              <div className="animate-fadeIn">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    icon={Users}
                    label="Total Users"
                    value={stats.totalUsers || 0}
                    color="bg-blue-500"
                    trend={12}
                  />
                  <StatCard
                    icon={Calendar}
                    label="Total Bookings"
                    value={stats.totalBookings || 0}
                    color="bg-green-500"
                    trend={8}
                  />
                  <StatCard
                    icon={DollarSign}
                    label="Revenue"
                    value={`$${stats.revenue || 0}`}
                    color="bg-gold"
                    trend={15}
                  />
                  <StatCard
                    icon={TrendingUp}
                    label="Growth"
                    value={`${stats.growth || 0}%`}
                    color="bg-accent"
                  />
                </div>

                {/* Recent Activity */}
                <div className="mt-8 bg-white rounded-3xl shadow-xl p-8">
                  <h2 className="font-display text-2xl font-bold text-primary mb-6">Recent Bookings</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-500 border-b">
                          <th className="pb-4">Customer</th>
                          <th className="pb-4">Service</th>
                          <th className="pb-4">Stylist</th>
                          <th className="pb-4">Date</th>
                          <th className="pb-4">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(stats.recentBookings || []).map((booking) => (
                          <tr key={booking.id} className="border-b last:border-0">
                            <td className="py-4">{booking.user?.name || 'N/A'}</td>
                            <td className="py-4">{booking.service?.name || 'N/A'}</td>
                            <td className="py-4">{booking.stylist?.name || 'N/A'}</td>
                            <td className="py-4">{new Date(booking.dateTime).toLocaleDateString()}</td>
                            <td className="py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                booking.status === 'CONFIRMED'
                                  ? 'bg-green-100 text-green-700'
                                  : booking.status === 'PENDING'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="animate-fadeIn">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="font-display text-2xl font-bold text-primary">User Management</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr className="text-left text-gray-500">
                          <th className="p-4">Name</th>
                          <th className="p-4">Email</th>
                          <th className="p-4">Phone</th>
                          <th className="p-4">Role</th>
                          <th className="p-4">Joined</th>
                          <th className="p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50">
                            <td className="p-4 font-medium">{user.name}</td>
                            <td className="p-4 text-gray-600">{user.email}</td>
                            <td className="p-4 text-gray-600">{user.phone || 'N/A'}</td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                user.role === 'ADMIN'
                                  ? 'bg-purple-100 text-purple-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {user.role || 'CUSTOMER'}
                              </span>
                            </td>
                            <td className="p-4 text-gray-600">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="animate-fadeIn">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="font-display text-2xl font-bold text-primary">All Bookings</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr className="text-left text-gray-500">
                          <th className="p-4">ID</th>
                          <th className="p-4">Customer</th>
                          <th className="p-4">Service</th>
                          <th className="p-4">Stylist</th>
                          <th className="p-4">Date & Time</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="border-b last:border-0 hover:bg-gray-50">
                            <td className="p-4 font-medium">#{booking.id}</td>
                            <td className="p-4">{booking.user?.name || 'N/A'}</td>
                            <td className="p-4">{booking.service?.name || 'N/A'}</td>
                            <td className="p-4">{booking.stylist?.name || 'N/A'}</td>
                            <td className="p-4 text-gray-600">
                              {new Date(booking.dateTime).toLocaleDateString()} at{' '}
                              {new Date(booking.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                booking.status === 'CONFIRMED'
                                  ? 'bg-green-100 text-green-700'
                                  : booking.status === 'PENDING'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : booking.status === 'CANCELLED'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                {booking.status === 'PENDING' && (
                                  <>
                                    <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg" title="Confirm">
                                      <Check size={18} />
                                    </button>
                                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Cancel">
                                      <X size={18} />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
