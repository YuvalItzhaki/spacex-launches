import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LaunchList from './pages/LaunchList';
import LaunchDetail from './pages/LaunchDetail';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LaunchList />} />
      <Route path="/launch/:id" element={<LaunchDetail />} />
    </Routes>
  </Router>
);

export default App;
