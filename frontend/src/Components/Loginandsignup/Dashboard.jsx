import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <header className="flex justify-between items-center mb-8 bg-black text-white p-4 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">Music Hub</h1>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
          Log Out
        </button>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Albums */}
          <div className="bg-amber-100 p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Featured Albums</h2>
            <ul>
              <li className="mb-2">🌟 Album Title - Artist</li>
              <li className="mb-2">🎤 Album Title - Artist</li>
              <li className="mb-2">🎵 Album Title - Artist</li>
              <li className="mb-2">🎧 Album Title - Artist</li>
            </ul>
            <button className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded">
              Discover More
            </button>
          </div>

          {/* Upcoming Events */}
          <div className="bg-lime-100 p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <ul>
              <li className="mb-2">🎶 Event Name - Date</li>
              <li className="mb-2">🎸 Event Name - Date</li>
              <li className="mb-2">🎤 Event Name - Date</li>
              <li className="mb-2">🎧 Event Name - Date</li>
            </ul>
          </div>

          {/* Top Tracks */}
          <div className="bg-cyan-100 p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Top Tracks</h2>
            <ul>
              <li className="mb-2">🎵 Track Title - Artist</li>
              <li className="mb-2">🎸 Track Title - Artist</li>
              <li className="mb-2">🎤 Track Title - Artist</li>
              <li className="mb-2">🎧 Track Title - Artist</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;


