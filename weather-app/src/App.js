
// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';
import axios from 'axios';

// ... (import statements remain the same)

const App = () => {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = 'f78f94134cf3ef0f3c262560317eb123';
      const city = 'BOSTON';
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

      try {
        const response = await axios.get(apiUrl);
        const extractedData = extractDataFromApiResponse(response.data);
        setForecastData(extractedData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const extractDataFromApiResponse = (apiData) => {
    const filteredData = apiData.list.filter((item, index) => {
      // Include only the first occurrence of each date (5 days)
      return index % 8 === 0;
    });

    return filteredData.map((item) => ({
      day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
      high: Math.floor(item.main.temp_max / 10),
      low: Math.floor(item.main.temp_min / 10),
      condition: item.weather[0].main.toLowerCase(),
    }));
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<WeatherForecast forecastData={forecastData} />} />
          <Route path="/:day" element={<HourlyForecast />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
