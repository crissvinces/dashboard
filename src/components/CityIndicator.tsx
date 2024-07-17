// src/components/CityIndicator.tsx

import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

interface CityConfig {
  cityName: string;
  country: string;
  timezone: string; // Changed to string for more flexible formatting
  latitude: number;
  longitude: number;
}

const CityIndicator: React.FC<CityConfig> = ({
  cityName,
  country,
  timezone,
  latitude,
  longitude
}) => {
  return (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography component="h2" variant="h5" color="primary" gutterBottom>
        City Information
      </Typography>
      <Divider sx={{ width: '100%', my: 1 }} />
      <Box sx={{ width: '100%', mt: 1 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>City Name:</strong> {cityName}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Country:</strong> {country}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Timezone:</strong> {timezone}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Latitude:</strong> {latitude}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Longitude:</strong> {longitude}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CityIndicator;
