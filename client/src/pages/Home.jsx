import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



export default function Home() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`w-screen h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      } overflow-hidden`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 max-w-4xl">
        {/* Share Ride Card */}
        <Link
          to="shareride"
          className={`flex flex-col items-center shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 ${
            theme === 'dark' ? 'bg-gray-800 text-antique-white' : 'bg-white text-gray-900'
          }`}
        >
          <div
            className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 ${
              theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'
            }`}
          >
            <span className="text-2xl">🚗</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Join Ride</h2>
          <p className="text-center">
          Find available rides and join others heading to your destination. Travel together with ease.
          </p>
        </Link>

        {/* Join Ride Card */}
        <Link
          to="offer-ride"
          className={`flex flex-col items-center shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 ${
            theme === 'dark' ? 'bg-gray-800 text-antique-white' : 'bg-white text-gray-900'
          }`}
        >
          <div
            className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 ${
              theme === 'dark' ? 'bg-green-600' : 'bg-green-500'
            }`}
          >
            <span className="text-2xl">🛣️</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Offer Ride</h2>
          <p className="text-center">
          
            Share your ride with others traveling on the same route. Save costs and make new friends.
          </p>
        </Link>

        {/* Plan Trip Card */}
        <Link
          to="trip-plan"
          className={`flex flex-col items-center shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 ${
            theme === 'dark' ? 'bg-gray-800 text-antique-white' : 'bg-white text-gray-900'
          }`}
        >
          <div
            className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 ${
              theme === 'dark' ? 'bg-red-600' : 'bg-red-500'
            }`}
          >
            <span className="text-2xl">🗺️</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Plan Trip</h2>
          <p className="text-center">
            Plan your trips and manage your routes efficiently. Get the best travel experience.
          </p>
        </Link>
      </div>
    </div>
  );
}
