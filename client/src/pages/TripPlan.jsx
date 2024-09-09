import React, { useState } from 'react';
import { Users, MapPin, Truck, DollarSign, X, Plus } from 'lucide-react';
import { FaRupeeSign } from 'react-icons/fa';

const TripPlanPage = () => {
  const [view, setView] = useState('menu'); // 'menu', 'create', or 'join'
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState({
    from: '',
    to: '',
    mode: 'car',
    members: 2,
    budget: '',
  });

  const handleCreateGroup = (e) => {
    e.preventDefault();
    const createdGroup = {
      ...newGroup,
      id: Date.now(),
      joinedMembers: 1,
    };
    setGroups([...groups, createdGroup]);
    setView('menu');
  };

  const handleCancelTrip = (id) => {
    setGroups(groups.filter(group => group.id !== id));
  };

  const handleJoinTrip = (id) => {
    setGroups(groups.map(group => 
      group.id === id ? { ...group, joinedMembers: group.joinedMembers + 1 } : group
    ));
  };

  const renderMenu = () => (
    <div className="space-y-4">
      <button
        onClick={() => setView('create')}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Create Group
      </button>
      <button
        onClick={() => setView('join')}
        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
      >
        Join Group
      </button>
    </div>
  );

  const renderCreateGroup = () => (
    <form onSubmit={handleCreateGroup} className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="From"
          className="flex-1 p-2 border rounded"
          value={newGroup.from}
          onChange={(e) => setNewGroup({ ...newGroup, from: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="To"
          className="flex-1 p-2 border rounded"
          value={newGroup.to}
          onChange={(e) => setNewGroup({ ...newGroup, to: e.target.value })}
          required
        />
      </div>
      <select
        className="w-full p-2 border rounded"
        value={newGroup.mode}
        onChange={(e) => setNewGroup({ ...newGroup, mode: e.target.value })}
      >
        <option value="bus">🚌Bus</option>
        <option value="car">🚗Car</option>
        <option value="bike">🛵Bike</option>
        <option value="train">🚂Train</option>
        <option value="plane">✈️Plane</option>
        <option value="cruise">🛳️Cruise</option>
      </select>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Group Members</label>
          <input
            type="number"
            min={2}
            className="w-full p-2 border rounded"
            value={newGroup.members}
            onChange={(e) => setNewGroup({ ...newGroup, members: Math.max(2, parseInt(e.target.value)) })}
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget per Person(In Rupees)</label>
          <input
            type="number"
            min={0}
            placeholder='₹'
            className="w-full p-2 border rounded"
            value={newGroup.budget}
            onChange={(e) => setNewGroup({ ...newGroup, budget: e.target.value })}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Create Group
      </button>
    </form>
  );

  const renderJoinGroup = () => (
    <div className="space-y-4">
      {groups.length > 0 ? (
        groups.map(group => (
          <div key={group.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">From : {group.from}
                    <br/>
                     To : {group.to}</p>
                <p className="text-sm text-gray-600">Mode: {group.mode}</p>
                <p className="text-sm text-gray-600">
                  <Users size={16} className="inline mr-1" />
                  {group.joinedMembers} / {group.members} members
                </p>
                <p className="text-sm text-gray-600">
                  <DollarSign size={16} className="inline mr-1" />
                  Budget: ₹{group.budget} per person
                </p>
              </div>
              <button
                onClick={() => handleJoinTrip(group.id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300"
                disabled={group.joinedMembers >= group.members}
              >
                {group.joinedMembers >= group.members ? 'Full' : 'Join'}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No groups available. Create one to get started!</p>
      )}
    </div>
  );

  const renderGroupCard = (group) => (
    <div key={group.id} className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">From : {group.from} 
            <br />
            To : {group.to}</p>
          <p className="text-sm text-gray-600">Mode: {group.mode}</p>
          <p className="text-sm text-gray-600">
            <Users size={16} className="inline mr-1" />
            {group.joinedMembers} / {group.members} members
          </p>
          <p className="text-sm text-gray-600">
             <span></span>
            Budget: ₹ {group.budget} per person
          </p>
        </div>
        <button
          onClick={() => handleCancelTrip(group.id)}
          className="text-red-500 hover:text-red-700 transition duration-300"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Trip Planner</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          {view === 'menu' && renderMenu()}
          {view === 'create' && renderCreateGroup()}
          {view === 'join' && renderJoinGroup()}
        </div>
        {groups.length > 0 && view === 'menu' && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Trip Groups</h2>
            <div className="space-y-4">
              {groups.map(renderGroupCard)}
            </div>
          </div>
        )}
        {view !== 'menu' && (
          <button
            onClick={() => setView('menu')}
            className="mt-4 text-blue-500 hover:text-blue-700 transition duration-300"
          >
            Back to Menu
          </button>
        )}
      </div>
    </div>
  );
};

export default TripPlanPage;