import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BangGia from './pages/BangGia';
import DichVu from './pages/DichVu';
import PhanMem from './pages/PhanMem';
import LienHe from './pages/LienHe';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bang-gia" element={<BangGia />} />
            <Route path="/dich-vu" element={<DichVu />} />
            <Route path="/phan-mem" element={<PhanMem />} />
            <Route path="/lien-he" element={<LienHe />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
