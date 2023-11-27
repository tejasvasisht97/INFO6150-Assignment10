// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home/Home';
// import WeatherForecast from './components/WeatherForecast/WeatherForecast';
// import HourlyForecast from './components/HourlyForecast/HourlyForecast';

// const App = () => {
//   const forecastData = [
//     { day: 'Monday', high: 28, low: 20, condition: 'sunny' },
//     { day: 'Tuesday', high: 25, low: 18, condition: 'cloudy' },
//     { day: 'Wednesday', high: 30, low: 22, condition: 'rainy' },
//     { day: 'Thursday', high: 22, low: 15, condition: 'snowy' },
//     { day: 'Friday', high: 26, low: 19, condition: 'sunny' },
//   ];
//   const getWeatherIcon = (condition) => {
//     switch (condition) {
//       case 'sunny':
//         return 'sunny.png';
//       case 'cloudy':
//         return 'cloudy.png';
//       case 'rainy':
//         return 'rainy.png';
//       case 'snowy':
//         return 'snowy.png';
//       default:
//         return 'unknown.png';
//     }
//   };

//   const getHourlyDataForDay = () => {
//     return [
//       { time: '12 AM', temperature: 22 },
//       { time: '3 AM', temperature: 20 },
//       { time: '6 AM', temperature: 18 },
//       { time: '9 AM', temperature: 25 },
//       { time: '12 PM', temperature: 28 },
//       { time: '3 PM', temperature: 30 },
//       { time: '6 PM', temperature: 28 },
//       { time: '9 PM', temperature: 25 },
//     ];
//   };


//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route
//             path="/"
//             element={<WeatherForecast forecastData={forecastData} />}
//           />
//           <Route
//             path="/:day"
//             element={<HourlyForecast hourlyData={getHourlyDataForDay()} />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// };
// export default App;

// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';
import axios from 'axios';

const App = () => {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    // Function to fetch 5-day forecast data from OpenWeatherMap API
    const fetchWeatherData = async () => {
      const apiKey = 'f78f94134cf3ef0f3c262560317eb123'; // Replace with your API key
      const city = 'BOSTON'; // Replace with the city you want to get the forecast for
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
    return apiData.list.map((item) => ({
      day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
      high: Math.floor(item.main.temp_max/10),
      low: Math.floor(item.main.temp_min/10),
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
