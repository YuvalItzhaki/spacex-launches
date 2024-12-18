import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LaunchList from "./components/LaunchList";
import LaunchDetail from "./components/LaunchDetail";
// import Home from "./components/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/launches/:page?" element={<LaunchList />} />
        <Route path="/launch/:id" element={<LaunchDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
