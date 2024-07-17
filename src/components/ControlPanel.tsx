import React, { useState, useCallback, useRef } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface ControlPanelProps {
  onVariableChange: (variable: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onVariableChange }) => {
  const [selectedVariable, setSelectedVariable] = useState<string>("all");
  const descriptionRef = useRef<HTMLDivElement>(null);

  const variables = [
    {
      name: "Humedad",
      description: "Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje.",
      value: "humidity",
    },
    {
      name: "Nubosidad",
      description: "Grado de cobertura del cielo por nubes, afectando la visibilidad y la cantidad de luz solar recibida.",
      value: "clouds",
    },
    {
      name: "Precipitación",
      description: "Cantidad de agua, en forma de lluvia, nieve o granizo, que cae sobre una superficie en un período específico.",
      value: "precipitation",
    },
    {
      name: "General",
      description: "Información meteorológica general.",
      value: "all",
    },
  ];

  const handleChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const value = event.target.value as string;
      setSelectedVariable(value);

      const selected = variables.find((variable) => variable.value === value);
      if (descriptionRef.current) {
        descriptionRef.current.innerHTML = selected ? selected.description : "";
      }

      onVariableChange(value);
    },
    [onVariableChange, variables]
  );

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Typography mb={2} component="h3" variant="h6" color="primary">
        Variables Meteorológicas
      </Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="select-label">Variables</InputLabel>
          <Select
            labelId="select-label"
            id="variable-select"
            value={selectedVariable}
            label="Variables"
            onChange={handleChange}
          >
            <MenuItem value="all">Seleccione una variable</MenuItem>
            {variables.map((variable, index) => (
              <MenuItem key={index} value={variable.value}>
                {variable.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Typography
        ref={descriptionRef}
        mt={2}
        component="p"
        color="text.secondary"
      />
    </Paper>
  );
};

export default ControlPanel;
