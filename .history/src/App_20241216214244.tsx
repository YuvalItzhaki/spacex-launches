import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LaunchList from './components/LaunchList';
import LaunchDetail from './components/LaunchDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LaunchList />} />
        <Route path="/launch/:id" element={<LaunchDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
