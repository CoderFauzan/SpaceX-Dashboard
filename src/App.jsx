
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Universe from './assets/Universe.jpg';
import Dashboard from './components/Dashboard';
import Rockets from './components/Rockets';
import Ships from './components/Ships';
import History from './components/History';
import Logo from './assets/spacex.png';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-cover" style={{ backgroundImage: `url(${Universe})` }}>
        <header className="bg-black text-white p-4">
          <div className="container mx-auto flex flex-col items-center">
            <div className="mb-4">
              <img src={Logo} alt="Logo" className="h-16" />
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link to="/" className="text-xl">Dashboard</Link>
                </li>
                <li>
                  <Link to="/rockets" className="text-xl">Rockets</Link>
                </li>
                <li>
                  <Link to="/ships" className="text-xl">Ships</Link>
                </li>
                <li>
                  <Link to="/history" className="text-xl">History</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rockets" element={<Rockets />} />
            <Route path="/ships" element={<Ships />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
