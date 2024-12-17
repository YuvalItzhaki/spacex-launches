// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LaunchList from './pages/LaunchList';
import LaunchDetail from './pages/LaunchDetail';

const App: React.FC = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<LaunchList />} />
      <Route path="/launch/:id" element={<LaunchDetail />} />
    </Routes>
  </Router>
);

export default App;
