import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Scissors, BarChart3, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const quickActions = [
    { icon: Calendar, label: t('dashboard.myBookings'), count: '3', color: 'bg-blue-500', href: '/bookings' },
    { icon: Scissors, label: t('dashboard.bookService'), count: t('dashboard.bookNow'), color: 'bg-violet-500', href: '/book' },
    { icon: BarChart3, label: t('dashboard.history'), count: '12', color: 'bg-green-500', href: '/bookings?filter=completed' },
  ];

  const upcomingBookings = [
    {
      id: 1,
      stylist: '李发型师',
      stylistEn: 'Stylist Li',
      date: '今天',
      dateEn: 'Today',
      time: '14:00',
      service: '剪发 + 染发',
      serviceEn: 'Haircut + Dye',
      status: 'pending'
    },
    {
      id: 2,
      stylist: '王造型师',
      stylistEn: 'Stylist Wang',
      date: '明天',
      dateEn: 'Tomorrow',
      time: '10:00',
      service: '烫发',
      serviceEn: 'Perm',
      status: 'confirmed'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('dashboard.welcome')}, {user.name || 'User'}!
          </h1>
          <p className="text-gray-600">{t('dashboard.whatToDo')}</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group"
            >
              <div className={`${action.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                <action.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{action.label}</h3>
              <p className="text-gray-500 text-sm">{action.count}</p>
            </a>
          ))}
        </div>

        {/* Upcoming Bookings */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-500" />
            {t('dashboard.upcoming')}
          </h2>

          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {booking.stylist[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{booking.stylist}</h3>
                      <p className="text-sm text-gray-500">{booking.stylistEn}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="mr-3">{booking.date} {booking.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {booking.service} / {booking.serviceEn}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status === 'confirmed' ? t('booking.confirmed') : t('booking.pending')}
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        {t('booking.viewDetails')}
                      </button>
                      {booking.status === 'pending' && (
                        <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                          {t('booking.cancel')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
