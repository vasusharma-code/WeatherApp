import axios from 'axios';

const API_KEY = 'b6b51d3b6d6f0abd63fbe3f98d76affc';

export const getWeatherByLocation = async (lat, lon) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
};

export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
};
