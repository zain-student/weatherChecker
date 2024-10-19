import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
} from "react-native";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "8e6f4980c04c0bd39421e8e5eb47c6c0";
  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../assets/images/weatherBackground.jpg")}
      style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.title}>Weather Checker</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          placeholderTextColor="white"
          value={city}
          onChangeText={(text) => setCity(text)}

          // onChangeText={setCity}
        />
        <Button title="Check Weather" onPress={fetchWeather} />
        {weather && (
          <View style={styles.weatherContainer}>
            <Text style={{ color: "white" }}>City: {city}</Text>
            <Text style={styles.temprature}>{weather.main.temp}°C</Text>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Condition: {weather.weather[0].description}
            </Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  temprature: {
    fontSize: 70,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  input: {
    width: "80%",
    padding: 10,
    borderColor: "#ccc",
    color: "white",
    borderWidth: 1,
    marginBottom: 20,
  },
  weatherContainer: {
    marginTop: 20,
    padding: 20,
  },
});

export default WeatherApp;
