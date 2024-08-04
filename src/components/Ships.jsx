import  { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLink } from 'react-icons/fa';

const Ships = () => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    axios.get('https://api.spacexdata.com/v4/ships')
      .then(response => setShips(response.data.slice(-4)))
      .catch(error => console.error('Error fetching ships:', error));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {ships.map(ship => (
        <div key={ship.id} className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
          <img src={ship.image || ''} alt={ship.name} className="h-48 w-full object-cover rounded mb-4" />
          <h3 className="text-2xl font-bold mb-2">{ship.name}</h3>
          <p className="text-gray-400">{ship.type}</p>
          {ship.url && (
            <a href={ship.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center mt-2">
              <FaLink className="mr-1" /> More Info
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default Ships;
