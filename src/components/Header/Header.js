import React, { useState, useEffect } from "react";
//import "./Header.css";
import Timer from "../Timer/Timer";
import { fetchWeather, getGeoLocation } from "../../services/weather.service";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

function Header({ time, setTime, isActive, questionFinished }) {
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    humidity: null,
    temperature: null,
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const location = await getGeoLocation();
        const weatherData = await fetchWeather(
          location.latitude,
          location.longitude
        );
        setWeather(weatherData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeatherData();
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          QuizApp
        </Typography>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          <Timer
            time={time}
            setTime={setTime}
            isActive={isActive}
            questionFinished={questionFinished}
          />
        </Typography>

        <Box textAlign="center">
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={0}>
            <Box textAlign="center" gridColumn="span 6">
              {weather.humidity ? <Typography >{weather.humidity}</Typography> : ""}
            </Box>
            <Box textAlign="center" gridColumn="span 6">
              {weather.temperature ? <Typography >{weather.temperature}</Typography> : ""}
            </Box>
            <Box gridColumn="span 6">
              <Typography textAlign="center" variant="subtitle 2" >Humidity</Typography>
            </Box>
            <Box textAlign="center" gridColumn="span 6">
              <Typography variant="subtitle 2" >Temperature</Typography>
            </Box>
            <Box textAlign="center" gridColumn="span 12">
              {weather.city || weather.country ? <Typography variant="subtitle 2" >{weather.city},{weather.country}</Typography> : ""}
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
