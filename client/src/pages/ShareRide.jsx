import React, { useState } from 'react';
import { Search, Car, Bike, Star, Calendar, Clock, Users } from 'lucide-react';

const ShareRidePage = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);

  // Enhanced test data with available seats, date, and time
  const testRides = [
    { id: 1, from: 'nana mava', to: 'vvp', price: '₹50', driver: 'Vivaan Patel', mode: 'bike', rating: 4.5, seats: 1, date: '2024-09-08', time: '09:00 AM' },
    { id: 2, from: 'nana mava', to: 'vvp', price: '₹150', driver: 'Aditya Sharma', mode: 'car', rating: 5, seats: 4, date: '2024-09-08', time: '10:30 AM' },
    { id: 3, from: 'nana mava', to: 'vvp', price: '₹50', driver: 'Karthik Iyer', mode: 'bike', rating: 4, seats: 1, date: '2024-09-08', time: '07:00 AM' },
    { id: 4, from: 'nana mava', to: 'vvp', price: '₹150', driver: 'Rajesh Nair', mode: 'bike', rating: 3, seats: 1, date: '2024-09-08', time: '01:30 PM' },
    { id: 5, from: 'Chicago', to: 'Detroit', price: '$45', driver: 'Mike Johnson', mode: 'car', rating: 4.2, seats: 3, date: '2024-09-09', time: '02:00 PM' },
    { id: 6, from: 'Seattle', to: 'Portland', price: '$40', driver: 'Emily Brown', mode: 'bike', rating: 4.7, seats: 1, date: '2024-09-10', time: '11:00 AM' },
    { id: 7, from: 'Miami', to: 'Orlando', price: '$55', driver: 'David Wilson', mode: 'car', rating: 4.6, seats: 6, date: '2024-09-11', time: '08:30 AM' },
  ];

  const handleSearch = () => {
    const results = testRides.filter(ride => 
      ride.from.toLowerCase() === from.toLowerCase() &&
      ride.to.toLowerCase() === to.toLowerCase()
    );
    setSearchResults(results);
    setSearched(true);
  };

  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="From"
              className="flex-1 p-2 border rounded"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <input
              type="text"
              placeholder="To"
              className="flex-1 p-2 border rounded"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center justify-center"
            >
              <Search className="mr-2" size={20} />
              Search
            </button>
          </div>
        </div>

        {searched && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Available Rides</h2>
            {searchResults.length > 0 ? (
              <ul className="space-y-4">
                {searchResults.map((ride) => (
                  <li key={ride.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                      <p className="font-semibold ">
                    
                      From : <span className="text-indigo-500 uppercase">{ride.from}</span>
                      < br/>
                      To : <span className="text-red-500 uppercase">{ride.to}</span>
                      </p>
                      


                        <p className="text-gray-600 flex items-center">
                          Rider : {ride.driver} 
                          {ride.mode === 'car' ? <Car className="ml-2" size={16} /> : <Bike className="ml-2" size={16} />}
                        </p>
                        <RatingStars rating={ride.rating} />
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <Calendar size={14} className="mr-1" />
                          <span className="mr-3">{ride.date}</span>
                          <Clock size={14} className="mr-1" />
                          <span>{ride.time}</span>
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <Users size={14} className="mr-1" />
                          <span>{ride.seats} seat{ride.seats > 1 ? 's' : ''} available</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">{ride.price}</p>
                    
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300 mt-2 ">
                          Book
                        </button>
                      
                        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300 ml-2">
                          Message
                        </button>
                      
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No rides found for this route. Try a different search.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareRidePage;