import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Organisations from "./pages/Organisations";
import { StoreProvider } from "./stores/StoreProvider";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./shared/Layout";

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="orgs" element={<Organisations />} />
          </Route>
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;