import React from 'react';
import { Link } from 'react-router-dom';
import HourlyForecast from '../HourlyForecast/HourlyForecast';
import './WeatherForecast.css';

const WeatherForecast = ({ forecastData }) => {
  return (
    <div className="weather-forecast">
      <h2>5-Day Weather Forecast</h2>
      <div className="forecast-container">
        {forecastData.map((dayData, index) => (
          <div key={index} className="forecast-card">
            <h3>{dayData.day}</h3>
            <p>
              High: {dayData.high}°C | Low: {dayData.low}°C
            </p>
            <img src={getWeatherIcon(dayData.condition)} alt={`${dayData.condition} icon`} />
            <Link to={`/${dayData.day.toLowerCase()}`}>Hourly Forecast</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const getWeatherIcon = (condition) => {
  switch (condition) {
    case 'sunny':
      return 'sun.png';
    case 'cloudy':
      return 'cloud.png';
    case 'rainy':
      return 'rainy.png';
    case 'snowy':
      return 'winter.png';
    default:
      return 'unknown.png';
  }
};

const getHourlyDataForDay = (day) => {
    return [
      { time: '12 AM', temperature: 22 },
      { time: '3 AM', temperature: 20 },
      { time: '6 AM', temperature: 18 },
      { time: '9 AM', temperature: 25 },
      { time: '12 PM', temperature: 28 },
      { time: '3 PM', temperature: 30 },
      { time: '6 PM', temperature: 28 },
      { time: '9 PM', temperature: 25 },
    ];
  };

export default WeatherForecast;
