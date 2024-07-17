// src/components/Indicator.tsx

import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

interface IndicatorProps {
  title: string;
  unit?: string;
  value?: number | string;
  min?: number;
  max?: number;
  avg?: number;
  probability?: number;
  condition?: string;
}

const convertKelvinToCelsius = (kelvin: number): string => (kelvin - 273.15).toFixed(2);

const getWeatherIcon = (condition?: string) => {
  switch (condition?.toLowerCase()) {
    case 'clear':
    case 'sunny':
      return <WiDaySunny size={32} />;
    case 'clouds':
      return <WiCloudy size={32} />;
    case 'rain':
      return <WiRain size={32} />;
    case 'snow':
      return <WiSnow size={32} />;
    case 'thunderstorm':
      return <WiThunderstorm size={32} />;
    default:
      return <WiCloudy size={32} />;
  }
};

const Indicator: React.FC<IndicatorProps> = ({
  title,
  unit,
  value,
  min,
  max,
  avg,
  probability,
  condition,
}) => {
  const formatTemperature = (temp?: number) =>
    title === 'Temperatura' && temp !== undefined
      ? convertKelvinToCelsius(temp)
      : temp;

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        boxShadow: 3,
        width: '100%',
        textAlign: 'center'
      }}
    >
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
        {condition && getWeatherIcon(condition)}
        {value !== undefined && (
          <Typography variant="h5" sx={{ ml: condition ? 1 : 0 }}>
            {typeof value === 'number' && title === 'Temperatura' ? formatTemperature(value) : value} {unit}
          </Typography>
        )}
      </Box>
      {min !== undefined && max !== undefined && (
        <Box sx={{ mt: 1, width: '100%' }}>
          <Typography variant="body1">
            <strong>Min:</strong> {formatTemperature(min)} {unit}
          </Typography>
          <Typography variant="body1">
            <strong>Max:</strong> {formatTemperature(max)} {unit}
          </Typography>
          {avg !== undefined && (
            <Typography variant="body1">
              <strong>Prom:</strong> {formatTemperature(avg)} {unit}
            </Typography>
          )}
        </Box>
      )}
      {probability !== undefined && (
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Probabilidad:</strong> {probability}%
        </Typography>
      )}
    </Paper>
  );
};

export default Indicator;
