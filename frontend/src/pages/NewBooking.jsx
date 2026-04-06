import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, User, Star, Clock, DollarSign, Calendar } from 'lucide-react';

const NewBooking = () => {
  const { t } = useTranslation();
  const [selectedStylist, setSelectedStylist] = useState(0);
  const [selectedService, setSelectedService] = useState(0);
  const [selectedDate, setSelectedDate] = useState('today');
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [notes, setNotes] = useState('');

  const stylists = [
    { id: 1, name: '李师傅', nameEn: 'Stylist Li', rating: 4.9, image: 'L' },
    { id: 2, name: '王师傅', nameEn: 'Stylist Wang', rating: 4.8, image: 'W' },
    { id: 3, name: '张总监', nameEn: 'Director Zhang', rating: 5.0, image: 'Z' },
    { id: 4, name: '陈总监', nameEn: 'Director Chen', rating: 4.7, image: 'C' },
  ];

  const services = [
    { id: 1, name: '剪发', nameEn: 'Haircut', price: 68, duration: '30 min', durationCn: '约30分钟' },
    { id: 2, name: '染发', nameEn: 'Hair Dye', price: 198, duration: '2 hours', durationCn: '约2小时' },
    { id: 3, name: '烫发', nameEn: 'Perm', price: 388, duration: '3 hours', durationCn: '约3小时' },
    { id: 4, name: '护理', nameEn: 'Treatment', price: 128, duration: '1 hour', durationCn: '约1小时' },
  ];

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  const totalPrice = services[selectedService]?.price || 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t('booking.createSuccess'));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <a href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
            <ArrowLeft className="w-5 h-5 mr-1" />
            {t('common.back')}
          </a>
          <h1 className="text-2xl font-bold text-gray-900">{t('booking.newBooking')}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Select Stylist */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-500" />
              {t('booking.selectStylist')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stylists.map((stylist, index) => (
                <button
                  key={stylist.id}
                  type="button"
                  onClick={() => setSelectedStylist(index)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedStylist === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                    {stylist.image}
                  </div>
                  <p className="font-medium text-gray-900">{stylist.name}</p>
                  <p className="text-xs text-gray-500">{stylist.nameEn}</p>
                  <div className="flex items-center justify-center mt-2 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm ml-1">{stylist.rating}</span>
                  </div>
                  {selectedStylist === index && (
                    <div className="mt-2 text-xs text-blue-600 font-medium">✓ {t('common.selected')}</div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Select Service */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Scissors className="w-5 h-5 mr-2 text-blue-500" />
              {t('booking.selectService')}
            </h2>
            <div className="space-y-3">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedService(index)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                    selectedService === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                      selectedService === index ? 'border-blue-500' : 'border-gray-300'
                    }`}>
                      {selectedService === index && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{service.name} / {service.nameEn}</p>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {service.durationCn} / ~{service.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-lg font-semibold text-gray-900">
                    <DollarSign className="w-5 h-5" />
                    {service.price}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Select Time */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              {t('booking.selectTime')}
            </h2>
            
            {/* Date Selection */}
            <div className="flex space-x-4 mb-4">
              {['today', 'tomorrow'].map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedDate === date
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {date === 'today' ? t('booking.today') : t('booking.tomorrow')}
                </button>
              ))}
            </div>

            {/* Time Slots */}
            <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedTime === time
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </section>

          {/* Notes */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('booking.notes')}</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('booking.notesPlaceholder')}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={4}
            />
          </section>

          {/* Submit */}
          <div className="bg-white rounded-xl shadow-md p-6 sticky bottom-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t('booking.total')}</p>
                <p className="text-2xl font-bold text-gray-900">¥{totalPrice}</p>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
              >
                {t('booking.confirmBooking')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBooking;
