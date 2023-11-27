// HourlyForecast.js
import React from 'react';

const HourlyForecast = ({ day, hourlyData, onClose }) => {
  return (
    <div>
      <h2>Hourly Forecast for {day}</h2>
      <ul>
        {hourlyData.map((hour, index) => (
          <li key={index}>
            {hour.time}: {hour.temperature}°C
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close Hourly Forecast</button>
    </div>
  );
};

export default HourlyForecast;
