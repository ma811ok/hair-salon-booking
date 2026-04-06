import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Clock, User, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { serviceAPI, stylistAPI, bookingAPI } from '../services/api';

const Bookings = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const preselectedStylist = searchParams.get('stylist');
    const fetchData = async () => {
      try {
        const [servicesRes, stylistsRes] = await Promise.all([
          serviceAPI.getAll(),
          stylistAPI.getAll(),
        ]);
        setServices(servicesRes.data);
        setStylists(stylistsRes.data);
        if (preselectedStylist) {
          const stylist = stylistsRes.data.find(s => s.id === parseInt(preselectedStylist));
          if (stylist) {
            setSelectedStylist(stylist);
            setStep(1);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    if (selectedStylist && selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedStylist, selectedDate]);

  const fetchAvailableSlots = async () => {
    try {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const res = await stylistAPI.getAvailableSlots(selectedStylist.id, dateStr);
      setAvailableSlots(res.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setAvailableSlots(generateMockSlots());
    }
  };

  const generateMockSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour}:00`);
      if (hour < 18) slots.push(`${hour}:30`);
    }
    return slots.filter((_, i) => Math.random() > 0.3);
  };

  const handleSubmit = async () => {
    if (!selectedService || !selectedStylist || !selectedDate || !selectedTime) {
      setError(t('booking.selectService'));
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const dateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':');
      dateTime.setHours(parseInt(hours), parseInt(minutes));

      await bookingAPI.create({
        serviceId: selectedService.id,
        stylistId: selectedStylist.id,
        dateTime: dateTime.toISOString(),
        userId: user.id,
      });

      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || t('booking.bookingFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  // Calendar helpers
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDateSelectable = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = date.getDay();
    return date >= today && dayOfWeek !== 0;
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const weekDaysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
            <Check className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="font-display text-3xl font-bold text-primary mb-4">{t('booking.bookingSuccess')}!</h2>
          <p className="text-gray-600 mb-8">
            {t('booking.confirmationSent')}
          </p>
          <button
            onClick={() => {
              setSuccess(false);
              setStep(1);
              setSelectedService(null);
              setSelectedStylist(null);
              setSelectedDate(null);
              setSelectedTime(null);
            }}
            className="btn-primary"
          >
            {t('booking.bookAnother')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-primary mb-4">{t('booking.title')}</h1>
          <p className="text-gray-600">{t('booking.followSteps')}</p>
        </div>

        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3, 4].map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex items-center ${s <= step ? 'text-accent' : 'text-gray-300'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  s <= step ? 'bg-accent text-white' : 'bg-gray-200'
                }`}>
                  {s < step ? <Check size={20} /> : s}
                </div>
                <span className="ml-2 font-medium hidden sm:inline">
                  {s === 1 ? t('booking.selectService') : s === 2 ? t('booking.selectStylist') : s === 3 ? t('booking.selectDateTime') : t('booking.confirmBooking')}
                </span>
              </div>
              {i < 3 && (
                <div className={`w-16 sm:w-24 h-1 mx-2 ${s < step ? 'bg-accent' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto">
          {step === 1 && (
            <div className="animate-fadeIn">
              <h2 className="font-display text-2xl font-bold text-primary mb-6">{t('booking.selectService')}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service);
                      setStep(2);
                    }}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${
                      selectedService?.id === service.id
                        ? 'border-accent bg-accent/5'
                        : 'border-gray-200 hover:border-accent/50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display text-lg font-bold text-primary">{service.name}</h3>
                      <span className="text-accent font-bold">¥{service.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                    <span className="text-gray-500 text-sm flex items-center">
                      <Clock size={14} className="mr-1" />
                      {service.duration} {t('service.minutes')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fadeIn">
              <h2 className="font-display text-2xl font-bold text-primary mb-6">{t('booking.selectStylist')}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stylists.map((stylist) => (
                  <button
                    key={stylist.id}
                    onClick={() => {
                      setSelectedStylist(stylist);
                      setStep(3);
                    }}
                    className={`p-6 rounded-2xl border-2 text-center transition-all ${
                      selectedStylist?.id === stylist.id
                        ? 'border-accent bg-accent/5'
                        : 'border-gray-200 hover:border-accent/50'
                    }`}
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                      <img
                        src={stylist.avatar || `https://ui-avatars.com/api/?name=${stylist.name}&background=e94560&color=fff&size=100`}
                        alt={stylist.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-display text-lg font-bold text-primary">{stylist.name}</h3>
                    <p className="text-accent text-sm mb-2">{stylist.specialty}</p>
                    <div className="flex justify-center items-center text-sm text-gray-500">
                      <span className="text-gold">{'★'.repeat(Math.floor(stylist.rating))}</span>
                      <span className="ml-1">{stylist.rating}</span>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="mt-6 text-gray-600 flex items-center hover:text-accent">
                <ChevronLeft size={20} /><span>{t('common.back')}</span>
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fadeIn">
              <h2 className="font-display text-2xl font-bold text-primary mb-6">{t('booking.selectDateTime')}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-2 hover:bg-gray-100 rounded-full">
                      <ChevronLeft size={20} />
                    </button>
                    <h3 className="font-display text-lg font-bold">
                      {currentMonth.toLocaleDateString('zh-CN', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-2 hover:bg-gray-100 rounded-full">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentMonth).map((date, i) => (
                      <button
                        key={i}
                        disabled={!isDateSelectable(date)}
                        onClick={() => setSelectedDate(date)}
                        className={`p-2 rounded-lg text-center transition-all ${
                          isSelected(date)
                            ? 'bg-accent text-white'
                            : isDateSelectable(date)
                            ? 'hover:bg-accent/10'
                            : 'text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        {date?.getDate()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-4 flex items-center">
                    <Clock size={18} className="mr-2" />
                    {t('booking.availableTimes')}
                  </h3>
                  {selectedDate ? (
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`p-3 rounded-xl border-2 text-center transition-all ${
                            selectedTime === slot
                              ? 'border-accent bg-accent text-white'
                              : 'border-gray-200 hover:border-accent/50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-12 border-2 border-dashed border-gray-200 rounded-xl">
                      {t('booking.selectDateFirst')}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(2)} className="text-gray-600 flex items-center hover:text-accent">
                  <ChevronLeft size={20} /><span>{t('common.back')}</span>
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!selectedDate || !selectedTime}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('booking.continueConfirm')}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fadeIn">
              <h2 className="font-display text-2xl font-bold text-primary mb-6">{t('booking.confirmBooking')}</h2>
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">{t('booking.service')}</p>
                    <p className="font-bold text-primary">{selectedService?.name}</p>
                    <p className="text-accent">¥{selectedService?.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">{t('booking.stylist')}</p>
                    <p className="font-bold text-primary">{selectedStylist?.name}</p>
                    <p className="text-gray-500 text-sm">{selectedStylist?.specialty}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">{t('booking.date')}</p>
                    <p className="font-bold text-primary">
                      {selectedDate?.toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">{t('booking.time')}</p>
                    <p className="font-bold text-primary">{selectedTime}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStep(3)} className="text-gray-600 flex items-center hover:text-accent">
                  <ChevronLeft size={20} /><span>{t('common.back')}</span>
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-primary flex items-center space-x-2"
                >
                  {submitting ? (
                    <div className="spinner w-6 h-6"></div>
                  ) : (
                    <>
                      <Check size={20} /><span>{t('booking.confirmBooking')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
