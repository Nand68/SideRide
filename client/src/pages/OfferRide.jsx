import React, { useState } from 'react';
import { Car, Bike, Calendar, Clock, Users, X } from 'lucide-react';

const OfferRidePage = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [seats, setSeats] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [mode, setMode] = useState('bike');
  const [offerMade, setOfferMade] = useState(false);
  const [joinedRiders, setJoinedRiders] = useState(0);

  const handleOfferRide = () => {
    // Here you would typically send this data to a backend
    // For now, we'll just set offerMade to true
    setOfferMade(true);
  };

  const handleCancelOffer = () => {
    setOfferMade(false);
    setJoinedRiders(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Offer a Ride</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          {!offerMade ? (
            <form onSubmit={(e) => { e.preventDefault(); handleOfferRide(); }} className="space-y-4">
              
              
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="From"
                  className="flex-1 p-2 border rounded"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="To"
                  className="flex-1 p-2 border rounded"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-4 items-center">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="bike"
                    checked={mode === 'bike'}
                    onChange={() => { setMode('bike'); setSeats(1); }}
                    className="mr-2"
                  />
                  <Bike size={20} className="mr-1" /> Bike
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="car"
                    checked={mode === 'car'}
                    onChange={() => { setMode('car'); setSeats(Math.min(seats, 6)); }}
                    className="mr-2"
                  />
                  <Car size={20} className="mr-1" /> Car
                </label>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available Seats</label>
                  <input
                    type="number"
                    min={1}
                    max={mode === 'bike' ? 1 : 6}
                    value={seats}
                    onChange={(e) => setSeats(Math.min(parseInt(e.target.value), mode === 'bike' ? 1 : 6))}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Offer Ride
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Your Ride Offer</h2>
              <p><strong>From:</strong> {from}</p>
              <p><strong>To:</strong> {to}</p>
              <p className="flex items-center">
                <strong className="mr-2">Mode:</strong>
                {mode === 'car' ? <Car size={20} /> : <Bike size={20} />}
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </p>
              <p className="flex items-center">
                <Calendar size={20} className="mr-2" /> {date}
              </p>
              <p className="flex items-center">
                <Clock size={20} className="mr-2" /> {time}
              </p>
              <p className="flex items-center">
                <Users size={20} className="mr-2" /> {joinedRiders} / {seats} seats taken
              </p>
              <button
                onClick={handleCancelOffer}
                className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 flex items-center justify-center"
              >
                <X size={20} className="mr-2" />
                Cancel Offer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferRidePage;