import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { getWeatherByLocation } from '../utils/api';
import WeatherCard from '../components/WeatherCard';
import Loading from '../components/Loading';

const HomeScreen = ({ navigation }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const fetchWeather = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const weatherData = await getWeatherByLocation(location.coords.latitude, location.coords.longitude);
      setWeather(weatherData);
    } catch (err) {
      setError('Failed to fetch weather data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const refreshWeather = () => {
    setLoading(true);
    setError(null);
    setWeather(null);
    fetchWeather();  
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
        <Button title="Retry" onPress={refreshWeather} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WeatherCard weather={weather} />
      <Button title="Search by City" onPress={() => navigation.navigate('Search')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
