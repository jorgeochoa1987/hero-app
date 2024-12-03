import './App.css';
import Header from './components/Header';
import SuperHeroes from './pages/SuperHeros';
import Home from './pages/Home';
import MyTeam from './pages/MyTeam';
import DetailHero from './pages/DetailHero';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './fonts/ObelixPro-cyr.ttf';
import './fonts/ObelixPro-cyr.ttf';

function App() {
  const handleFilterSubmit = (filters: any) => {
  console.log('Header->:', filters);
  };

  return (
    <BrowserRouter>
      <Header onSubmitFilters={handleFilterSubmit} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/heroes" element={<SuperHeroes />} />
        <Route path="/my-team" element={<MyTeam />} />
        <Route path="/detail-hero/:name" element={<DetailHero />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
