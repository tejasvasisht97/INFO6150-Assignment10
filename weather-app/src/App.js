
// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const App = () => {
  const [forecastData, setForecastData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const { day } = useParams();


  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = 'f78f94134cf3ef0f3c262560317eb123';
      const city = 'BOSTON';
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

      try {
        const response = await axios.get(apiUrl);
        const extractedData = extractDataFromApiResponse(response.data);
        setForecastData(extractedData);
        const hourly = extractHourlyDataFromApiResponse(response.data);
        setHourlyData(hourly);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const extractDataFromApiResponse = (apiData) => {
    const filteredData = apiData.list.filter((item, index) => {
      return index % 8 === 0;
    });

    return filteredData.map((item) => ({
      day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
      high: item.main.temp_max,
      low: item.main.temp_min,
      condition: item.weather[0].main.toLowerCase(),
    }));
  };

  const extractHourlyDataFromApiResponse = (apiData) => {
    return apiData.list.map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }),
      temperature: Math.floor(item.main.temp / 10),
    }));
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<WeatherForecast forecastData={forecastData} />} />
          <Route path="/:day" element={<HourlyForecast forecastData={forecastData} hourlyData={hourlyData} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
