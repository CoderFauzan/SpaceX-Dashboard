import  { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLink } from 'react-icons/fa';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('https://api.spacexdata.com/v4/history')
      .then(response => setHistory(response.data.slice(0,8)))
      .catch(error => console.error('Error fetching history:', error));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {history.map(event => (
        <div key={event.id} className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
          <p className="text-gray-400">{new Date(event.event_date_utc).toLocaleDateString()}</p>
          <p className="mb-4">{event.details}</p>
          {event.links.article && (
            <a href={event.links.article} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center mt-2">
              <FaLink className="mr-1" /> Read More
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default History;
