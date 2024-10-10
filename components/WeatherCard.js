import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData || !weatherData.name) {
    return <Text>No data available</Text>; 
  }

  return (
    <View>
      <Text>{weatherData.name}</Text>
      <Text>{weatherData.main.temp}°C</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default WeatherCard;
