import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, User } from 'lucide-react';

const MobileNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
      <div className="flex justify-around py-2">
        <Link to="/dashboard" className="flex flex-col items-center p-2 text-primary">
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/bookings" className="flex flex-col items-center p-2 text-gray-500">
          <Calendar size={24} />
          <span className="text-xs mt-1">Book</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center p-2 text-gray-500">
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
