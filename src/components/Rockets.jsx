import  { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

Modal.setAppElement('#root');

const Rockets = () => {
  const [rockets, setRockets] = useState([]);
  const [selectedRocket, setSelectedRocket] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    axios.get('https://api.spacexdata.com/v4/rockets')
      .then(response => setRockets(response.data.slice(0, 9)))
      .catch(error => console.error('Error fetching rockets:', error));
  }, []);

  const openModal = (rocket) => {
    setSelectedRocket(rocket);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedRocket(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {rockets.map(rocket => (
        <div key={rocket.id} className="bg-gray-900 text-white p-4 rounded-lg shadow-lg cursor-pointer" onClick={() => openModal(rocket)}>
          <img src={rocket.flickr_images[0]} alt={rocket.name} className="h-48 w-full object-cover rounded" />
          <h3 className="text-2xl font-bold mt-4">{rocket.name}</h3>
        </div>
      ))}

      {selectedRocket && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Rocket Details"
          className="fixed inset-0 flex items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          style={{ content: { inset: '12.5%', borderRadius: '10px', padding: '20px', background: '#2d2d2d', width: '75%', height: '75%' } }}
        >
          <button onClick={closeModal} className="absolute top-4 right-4 text-white text-xl">&times;</button>
          <div className="flex flex-col items-center text-white w-full">
            <h2 className="text-3xl font-bold mb-4">{selectedRocket.name}</h2>
            <div className="flex justify-center space-x-4 mb-4">
              <button onClick={() => setActiveTab('about')} className={`px-4 py-2 ${activeTab === 'about' ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-lg`}>About</button>
              <button onClick={() => setActiveTab('photos')} className={`px-4 py-2 ${activeTab === 'photos' ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-lg`}>Photos</button>
            </div>

            {activeTab === 'about' && (
              <div className="text-center w-full">
                <div className="flex justify-center mb-4">
                  <img src={selectedRocket.flickr_images[0]} alt={selectedRocket.name} className="h-64 w-full object-cover rounded" style={{ height: '300px', width: '500px', objectFit: 'contain' }} />
                </div>
                <p>{selectedRocket.description}</p>
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="flex justify-center w-full">
                <div className="w-full" style={{ height: '300px', width: '500px' }}>
                  <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
                    {selectedRocket.flickr_images.map((image, index) => (
                      <div key={index} className="h-64 w-full object-cover rounded" style={{ height: '300px', width: '500px', objectFit: 'contain' }}>
                        <img src={image} alt={`Rocket ${index + 1}`} className="h-full w-full object-contain rounded" />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Rockets;
