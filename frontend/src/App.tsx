import React from 'react';
import logo from './logo.svg';
// import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './markup/component/Header/Header';
import Footer from './markup/component/Footer/Footer';
import Home from './markup/pages/Home';
import store from './markup/redux/store/Store';
import Statistics from './markup/pages/Statistics';
import { Provider } from 'react-redux';
import { Notification } from './notification/Notification';
function App() {
  return (
    <div className=''>
      <Provider store={store}>  
        <Notification  />  
      <Router>
        <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
      </Router>
    <Footer  />
    </Provider>
    </div>
  );
}

export default App;