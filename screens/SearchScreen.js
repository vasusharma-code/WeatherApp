import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { getWeatherByCity } from '../utils/api';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';

const SearchScreen = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await getWeatherByCity(city);
      setWeather(weatherData);
    } catch (err) {
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={searchWeather} />
      {loading && <Loading />}
      {error && <Text>{error}</Text>}
      {weather && <WeatherCard weather={weather} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default SearchScreen;
