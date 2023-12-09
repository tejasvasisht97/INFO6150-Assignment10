// HourlyForecast.js
import React from 'react';
import { Link } from 'react-router-dom';


const HourlyForecast = ({ day, hourlyData, onClose, forecastData }) => {
  console.log(hourlyData)
  return (
    <div>
      <h2>Hourly Forecast</h2>
      <ul>
  {hourlyData.map((hour, index) => (
    <li key={index}>
      <span>{`Hour ${index + 1}:  `}</span>
      {hour.temperature}°C
    </li>
  ))}
</ul>
      <Link to={`/`}>Close Hourly Data</Link>
    </div>
  );
};

export default HourlyForecast;

