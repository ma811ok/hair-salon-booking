import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Save, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { authAPI } from '../services/api';

const Profile = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await authAPI.updateProfile({
        name: formData.name,
        phone: formData.phone,
      });
      updateUser({ name: formData.name, phone: formData.phone });
      setMessage({ type: 'success', text: t('profile.profileUpdated') });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || t('common.error') });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: t('auth.passwordMismatch') });
      setLoading(false);
      return;
    }

    try {
      await authAPI.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      setMessage({ type: 'success', text: t('profile.passwordChanged') });
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || t('common.error') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-4xl font-bold text-primary mb-8">{t('profile.title')}</h1>

        {message.text && (
          <div className={`mb-6 px-4 py-3 rounded-xl ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-5xl font-bold text-accent">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center hover:bg-accent/90 transition-colors">
                  <Camera size={18} />
                </button>
              </div>
              <h2 className="font-display text-2xl font-bold text-primary">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <div className="mt-4 inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                {user?.role === 'ADMIN' ? t('nav.admin') : t('profile.title')}
              </div>
            </div>
          </div>

          {/* Forms */}
          <div className="md:col-span-2 space-y-8">
            {/* Profile Form */}
            <form onSubmit={handleProfileUpdate} className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="font-display text-2xl font-bold text-primary mb-6 flex items-center">
                <User className="mr-3" size={24} />
                {t('profile.myInfo')}
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('auth.name')}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field pl-12"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('auth.email')}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field pl-12 bg-gray-100 cursor-not-allowed"
                      disabled
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{t('profile.emailCannotChange')}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('auth.phone')}</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field pl-12"
                      placeholder="+86 138 0000 0000"
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center space-x-2">
                  {loading ? <div className="spinner w-6 h-6"></div> : (
                    <>
                      <Save size={20} />
                      <span>{t('common.save')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Password Form */}
            <form onSubmit={handlePasswordChange} className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="font-display text-2xl font-bold text-primary mb-6 flex items-center">
                <Lock className="mr-3" size={24} />
                {t('profile.changePassword')}
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.currentPassword')}</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.newPassword')}</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="6+ characters"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('profile.confirmNewPassword')}</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <button type="submit" disabled={loading} className="btn-secondary w-full flex items-center justify-center space-x-2">
                  {loading ? <div className="spinner w-6 h-6"></div> : (
                    <>
                      <Lock size={20} />
                      <span>{t('profile.changePassword')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
