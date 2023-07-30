'use client'
import React, { useState, useEffect } from 'react';

const TvShowsGrid = () => {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/shows');
        const data = await response.json();
        setTvShows(data);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      }
    };

    fetchTvShows();
  }, []);

  return (
    <div className="container mx-auto mt-5">
      <div className="grid grid-cols-3 gap-4">
        {tvShows.map((show) => (
          <div key={show.id} className="bg-white rounded-lg p-4 shadow-md">
            <img
              src={show.image?.medium || 'https://via.placeholder.com/210x295'}
              alt={show.name}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-lg font-bold">{show.name}</h2>
            <p className="text-gray-600">{show.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TvShowsGrid;
