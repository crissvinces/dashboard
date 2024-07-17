import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Navbar from "./components/Navbar";
import Indicator from "./components/Indicator";
import CityIndicator from "./components/CityIndicator";
import Summary from "./components/Summary";
import BasicTable from "./components/BasicTable";
import WeatherChart from "./components/WeatherChart";
import ControlPanel from "./components/ControlPanel";
import clockImage from "./assets/reloj.jpg";

import "./App.css";

const App: React.FC = () => {
  const [cityData, setCityData] = useState<string[]>([]);
  const [rowsTable, setRowsTable] = useState<any[]>([]);
  const [indicators, setIndicators] = useState<any[]>([]);
  const [summaries, setSummaries] = useState<any[]>([]);
  const [chartData, setChartData] = useState<Array<Array<any>>>([
    ["Hora", "Precipitación", "Humedad", "Nubosidad"],
  ]);
  const [originalChartData, setOriginalChartData] = useState<Array<Array<any>>>([]);
  const [selectedVariable, setSelectedVariable] = useState<string>("all");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    (async () => {
      let savedTextXML = localStorage.getItem("openWeatherMap");
      let expiringTime = localStorage.getItem("expiringTime");
      let nowTime = new Date().getTime();

      if (expiringTime === null || nowTime > parseInt(expiringTime)) {
        const API_KEY = "90b89cc51fe397cbc9824e8983506f78";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`
        );
        savedTextXML = await response.text();
        const delay = 1 * 3600000; // 1 hour in milliseconds
        localStorage.setItem("openWeatherMap", savedTextXML);
        localStorage.setItem("expiringTime", (nowTime + delay).toString());
      }

      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML || "", "application/xml");

      // City data
      const location = xml.getElementsByTagName("location")[0];
      const cityName = location.getElementsByTagName("name")[0].textContent!;
      const country = location.getElementsByTagName("country")[0].textContent!;
      const timezone = location.getElementsByTagName("timezone")[0].textContent!;
      const locationNode = location.getElementsByTagName("location")[0];
      const latitude = locationNode.getAttribute("latitude")!;
      const longitude = locationNode.getAttribute("longitude")!;
      setCityData([cityName, country, timezone, latitude, longitude]);

      // Indicators
      const forecastElement = xml.getElementsByTagName("forecast")[0].getElementsByTagName("time")[0];
      const temperature = parseFloat(forecastElement.getElementsByTagName("temperature")[0].getAttribute("value")!);
      const temperatureMin = parseFloat(forecastElement.getElementsByTagName("temperature")[0].getAttribute("min")!);
      const temperatureMax = parseFloat(forecastElement.getElementsByTagName("temperature")[0].getAttribute("max")!);
      const humidity = parseFloat(forecastElement.getElementsByTagName("humidity")[0].getAttribute("value")!);
      const humidityUnit = forecastElement.getElementsByTagName("humidity")[0].getAttribute("unit")!;
      const probability = parseFloat(forecastElement.getElementsByTagName("precipitation")[0]?.getAttribute("probability") || '0');

      setIndicators([
        {
          title: "Temperatura",
          min: temperatureMin,
          avg: temperature,
          max: temperatureMax,
          unit: "°C",
        },
        {
          title: "Humedad",
          min: humidity,
          avg: humidity,
          max: humidity,
          unit: humidityUnit,
        },
        {
          title: "Precipitación",
          probability: probability,
        },
      ]);

      // Summaries and chart data
      const forecastElements = Array.from(xml.getElementsByTagName("forecast")[0].getElementsByTagName("time"));
      const summaryData: any[] = [];
      const chartDataArray: any[] = [];
      const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
      const currentDay = new Date().getDate();
      const addedDays: number[] = [];
      const tableRows: any[] = [];

      forecastElements.forEach((forecast) => {
        const date = new Date(forecast.getAttribute("from")!);
        const day = daysOfWeek[date.getDay()];
        const temp = parseFloat(forecast.getElementsByTagName("temperature")[0].getAttribute("value")!);
        const icon = forecast.getElementsByTagName("symbol")[0].getAttribute("var")!;
        const formattedDate = `${date.getDate()} ${date.toLocaleString("default", { month: "long" })}, ${date.getFullYear()}`;
        const time = date.toTimeString().split(" ")[0].slice(0, 5);
        const precipitation = parseFloat(forecast.getElementsByTagName("precipitation")[0]?.getAttribute("probability") || '0');
        const humidity = parseFloat(forecast.getElementsByTagName("humidity")[0].getAttribute("value")!);
        const clouds = parseFloat(forecast.getElementsByTagName("clouds")[0].getAttribute("all")!);

        chartDataArray.push([time, precipitation, humidity, clouds]);

        if (date.getDate() !== currentDay && !addedDays.includes(date.getDate())) {
          summaryData.push({
            day: day,
            temperature: `${(temp - 273.15).toFixed(1)}°C`,
            date: formattedDate,
            icon: icon,
          });
          addedDays.push(date.getDate());
        }

        const rangeHours = `${forecast.getAttribute("from")!.split("T")[1]} - ${forecast.getAttribute("to")!.split("T")[1]}`;
        const windDirection = `${forecast.getElementsByTagName("windDirection")[0].getAttribute("deg")} ${forecast.getElementsByTagName("windDirection")[0].getAttribute("code")}`;
        const windSpeed = `${forecast.getElementsByTagName("windSpeed")[0].getAttribute("mps")} ${forecast.getElementsByTagName("windSpeed")[0].getAttribute("unit")}`;
        const windGust = `${forecast.getElementsByTagName("windGust")[0].getAttribute("gust")} ${forecast.getElementsByTagName("windGust")[0].getAttribute("unit")}`;
        const pressure = `${forecast.getElementsByTagName("pressure")[0].getAttribute("value")} ${forecast.getElementsByTagName("pressure")[0].getAttribute("unit")}`;

        tableRows.push({
          date: formattedDate,
          timeRange: rangeHours,
          temperature: `${(temp - 273.15).toFixed(1)}°C`,
          windDirection: windDirection,
          windSpeed: windSpeed,
          windGust: windGust,
          pressure: pressure,
          humidity: `${humidity}%`,
        });
      });

      chartDataArray.unshift(["Hora", "Precipitación", "Humedad", "Nubosidad"]);
      setSummaries(summaryData);
      setChartData(chartDataArray);
      setOriginalChartData(chartDataArray); // Guardar los datos originales
      setRowsTable(tableRows);
    })();
  }, []);

  useEffect(() => {
    let newChartData: Array<Array<any>> = [["Hora", "Variable"]];
    switch (selectedVariable) {
      case "precipitation":
        newChartData = originalChartData.map((row, index) =>
          index === 0 ? ["Hora", "Precipitación"] : [row[0], row[1]]
        );
        break;
      case "humidity":
        newChartData = originalChartData.map((row, index) =>
          index === 0 ? ["Hora", "Humedad"] : [row[0], row[2]]
        );
        break;
      case "clouds":
        newChartData = originalChartData.map((row, index) =>
          index === 0 ? ["Hora", "Nubosidad"] : [row[0], row[3]]
        );
        break;
      default:
        newChartData = originalChartData;
    }
    setChartData(newChartData);
  }, [selectedVariable, originalChartData]);

  return (
    <Grid container spacing={5} justifyContent="center">
      <Grid xs={12} md={12} lg={12}>
        <Navbar />
      </Grid>
      <Grid xs={12} md={12} lg={12} id="general-info">
        <h2 style={{ color: "black", textAlign: "left" }}>Información general</h2>
      </Grid>
      <Grid xs={12} md={6} lg={4}>
        <div className="current-time-container">
          <h1 className="MuiTypography-root MuiTypography-h5 text-center my-3">Reloj</h1>
          <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root mb-4 shadow-sm">
            <img className="MuiCardMedia-root MuiCardMedia-media MuiCardMedia-img" src={clockImage} alt="Hora Actual" height="50" />
            <div className="MuiCardContent-root text-center">
              <h2 className="MuiTypography-root MuiTypography-h6 text-primary mb-2">Hora Actual</h2>
              <p className="MuiTypography-root MuiTypography-h4 font-weight-bold mb-2">{currentTime.toLocaleTimeString()}</p>
              <p className="MuiTypography-root MuiTypography-body1">Guayaquil, {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </Grid>
      <Grid xs={6} md={4} lg={2}>
        <CityIndicator
          cityName={cityData[0]}
          country={cityData[1]}
          timezone={cityData[2]}
          latitude={parseFloat(cityData[3])}
          longitude={parseFloat(cityData[4])}
        />
      </Grid>
      {indicators.map((indicator, index) => (
        <Grid key={index} xs={6} md={4} lg={2}>
          <Indicator {...indicator} />
        </Grid>
      ))}
      <Grid xs={12} md={12} lg={12} id="weather-forecast">
        <h2 style={{ color: "black", textAlign: "left" }}>Pronóstico Meteorológico Semanal</h2>
      </Grid>
      {summaries.map((summary, index) => (
        <Grid key={index} xs={6} sm={4} md={3} lg={2}>
          <Summary
            day={summary.day}
            temperature={summary.temperature}
            date={summary.date}
            icon={summary.icon}
          />
        </Grid>
      ))}
      <Grid xs={12} md={12} lg={12} id="climate-trends">
        <h2 style={{ color: "black", textAlign: "left" }}>Historial y Tendencias Climáticas</h2>
      </Grid>
      <Grid xs={12} lg={2}>
        <ControlPanel onVariableChange={setSelectedVariable} />
      </Grid>
      <Grid xs={12} lg={10}>
        <WeatherChart data={chartData} />
      </Grid>
      <Grid xs={12} md={12} lg={12} id="detailed-forecast">
        <h2 style={{ color: "black", textAlign: "left" }}>Análisis del Pronóstico</h2>
      </Grid>
      <Grid xs={12} md={12} lg={12}>
        <BasicTable data={rowsTable} />
      </Grid>
    </Grid>
  );
};

export default App;
