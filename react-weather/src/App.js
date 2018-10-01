import React, { Component } from 'react';

import './main.css';
import Header  from './Header';
import Footer  from './Footer';
import WeatherChannel from './WeatherChannel';

class App extends Component {
  render() {
    return (
      <div className="weather-channel__container">
          <Header />
          <WeatherChannel />
          <Footer />
      </div>
    );
  }
}

export default App;
