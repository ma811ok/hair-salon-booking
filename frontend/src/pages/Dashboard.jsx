import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Scissors, Star, ChevronRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { bookingAPI, serviceAPI, stylistAPI } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, stylistsRes, bookingsRes] = await Promise.all([
          serviceAPI.getAll(),
          stylistAPI.getAll(),
          bookingAPI.getAll(),
        ]);
        setServices(servicesRes.data.slice(0, 4));
        setStylists(stylistsRes.data.slice(0, 4));
        setRecentBookings(bookingsRes.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative bg-gradient-dark min-h-[60vh] flex items-center overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 border-2 border-white rounded-full"></div>
          <div className="absolute top-40 right-20 w-60 h-60 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 border-2 border-white rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles size={16} className="text-gold" />
                <span className="text-sm">Premium Hair Studio</span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6">
                {getGreeting()},{' '}
                <span className="text-gold">{user?.name?.split(' ')[0]}</span>
              </h1>
              <p className="text-white/80 text-lg mb-8 max-w-lg">
                Transform your look with our expert stylists. Book your appointment today and experience the art of precision cutting.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/bookings" className="btn-primary inline-flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>Book Now</span>
                </Link>
                <Link to="/profile" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">
                  View Profile
                </Link>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-gold/30 rounded-3xl"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-accent/20 rounded-full flex items-center justify-center">
                    <Scissors className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-white text-xl font-display">Expert Stylists</p>
                  <p className="text-white/70 mt-2">10+ years of experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-primary mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From classic cuts to modern styles, we offer a range of services tailored to your unique personality.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="card group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <Scissors className="w-8 h-8 text-accent group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-xl font-bold text-primary mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-accent font-bold text-xl">${service.price}</span>
                  <span className="text-gray-500 text-sm flex items-center">
                    <Clock size={14} className="mr-1" />
                    {service.duration} min
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/bookings"
              className="inline-flex items-center space-x-2 text-accent font-semibold hover:underline"
            >
              <span>View All Services</span>
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stylists Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-primary mb-4">Meet Our Stylists</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our talented team of professionals is dedicated to bringing your vision to life.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stylists.map((stylist, index) => (
              <div
                key={stylist.id}
                className="text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto bg-gray-200 rounded-full overflow-hidden group-hover:shadow-2xl transition-shadow">
                    <img
                      src={stylist.avatar || `https://ui-avatars.com/api/?name=${stylist.name}&background=e94560&color=fff&size=200`}
                      alt={stylist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gold text-primary px-4 py-1 rounded-full text-sm font-bold">
                    {stylist.specialty}
                  </div>
                </div>
                <h3 className="font-display text-xl font-bold text-primary mb-2">
                  {stylist.name}
                </h3>
                <div className="flex justify-center items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < stylist.rating ? 'text-gold fill-current' : 'text-gray-300'}
                    />
                  ))}
                  <span className="text-gray-500 text-sm ml-2">({stylist.reviews})</span>
                </div>
                <Link
                  to={`/bookings?stylist=${stylist.id}`}
                  className="inline-block mt-4 text-accent font-semibold hover:underline"
                >
                  Book with {stylist.name.split(' ')[0]}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Bookings Section */}
      {recentBookings.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-display text-4xl font-bold text-primary">Your Bookings</h2>
              <Link
                to="/bookings"
                className="inline-flex items-center space-x-2 text-accent font-semibold hover:underline"
              >
                <span>View All</span>
                <ChevronRight size={20} />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-primary">
                        {booking.service?.name || 'Haircut'}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        with {booking.stylist?.name || 'Any Stylist'}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === 'CONFIRMED'
                        ? 'bg-green-100 text-green-700'
                        : booking.status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar size={16} />
                      <span>{new Date(booking.dateTime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock size={16} />
                      <span>{new Date(booking.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-dark">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready for a New Look?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Book your appointment today and let our expert stylists transform your style.
          </p>
          <Link to="/bookings" className="btn-primary inline-flex items-center space-x-2 text-lg px-10 py-5">
            <Calendar size={24} />
            <span>Book Your Appointment</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
