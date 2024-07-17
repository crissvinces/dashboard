// src/components/BasicTable.tsx

import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface WeatherData {
  date: string;
  timeRange: string;
  windSpeed: string;
  windDirection: string;
  temperature: string;
  windGust: string;
  pressure: string;
  humidity: string;
}

interface TableProps {
  data: WeatherData[];
}

const BasicTable: React.FC<TableProps> = ({ data: initialData }) => {
  const [tableData, setTableData] = useState<WeatherData[]>([]);

  useEffect(() => {
    setTableData(initialData);
  }, [initialData]);

  return (
    <TableContainer component={Paper} style={{ maxHeight: 400 }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="basic table">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Fecha</strong>
            </TableCell>
            <TableCell>
              <strong>Rango de horas</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Velocidad del viento</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Dirección del viento</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Temperatura</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Ráfagas de viento</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Presión</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Humedad</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((entry, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {entry.date}
              </TableCell>
              <TableCell>{entry.timeRange}</TableCell>
              <TableCell align="right">{entry.windSpeed}</TableCell>
              <TableCell align="right">{entry.windDirection}</TableCell>
              <TableCell align="right">{entry.temperature}</TableCell>
              <TableCell align="right">{entry.windGust}</TableCell>
              <TableCell align="right">{entry.pressure}</TableCell>
              <TableCell align="right">{entry.humidity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
