// src/components/Summary.tsx

import React from "react";
import { Typography, Card, CardContent, CardMedia, CardActionArea } from "@mui/material";

interface SummaryProps {
  day: string;
  temperature: string;
  date: string;
  icon: string;
}

const Summary: React.FC<SummaryProps> = ({ day, temperature, date, icon }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather icon"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" color="primary">
            {day}
          </Typography>
          <Typography variant="h4">
            {temperature}
          </Typography>
          <Typography color="text.secondary">
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Summary;
