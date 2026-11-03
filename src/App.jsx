import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SliderBar from './components/sliderbar';
import Topbar from './components/Topbar';

import Dashboard from './pages/Dashbord';
import ChannelConfig from './pages/Channel_config';
import Products from './pages/Products';
import Parameters from './pages/Parameters';
import RuleBuilder from './pages/RuleBuilder';
import Resolution from './pages/Resolution';
import Alerts from './pages/Alerts';
import Cases from './pages/Cases';
import CDD_Onbording from './pages/CDD_onbording';
import Currencies from './pages/currencies';
import ParameterCategory from './pages/para-category.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <SliderBar />
        <main className="main-content">
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/channel-config" element={<ChannelConfig />} />
            <Route path="/products" element={<Products />} />
            <Route path="/CDD_onbording" element={<CDD_Onbording />} />
            <Route path="/para-category" element={<ParameterCategory />} />
            <Route path="/parameter-categories" element={<ParameterCategory />} />


            <Route path="/parameters" element={<Parameters />} />
            <Route path="/rule-builder" element={<RuleBuilder />} />
            <Route path="/resolution" element={<Resolution />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/currencies" element={<Currencies />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

