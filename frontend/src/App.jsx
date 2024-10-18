import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Posts from "./pages/Posts";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Posts />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
