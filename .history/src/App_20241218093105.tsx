import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import LaunchList from "./components/LaunchList";
import LaunchDetail from "./components/LaunchDetail";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/launches/1" replace />} />
        <Route path="/launches/:page?" element={<LaunchList />} />
        <Route path="/launch/:id" element={<LaunchDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
