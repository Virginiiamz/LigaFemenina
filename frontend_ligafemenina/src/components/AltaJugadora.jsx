import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

function AltaJugadora() {
  const [datos, setDatos] = useState({
    nombre: "",
    apellidos: "",
    posicion: "",
    sueldo: 0,
    disponible_jugar: true,
    fecha_inscripcion: new Date(),
    idequipo: 0,
  });
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    async function getEquipos() {
      let response = await fetch("http://localhost:3000/api/equipo/");

      if (response.ok) {
        let data = await response.json();
        setEquipos(data.datos);
      }
    }

    getEquipos();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatos({
      ...datos,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Alta jugadora
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack
            component="form"
            spacing={2}
            // onSubmit={handleSubmit}
            sx={{ mx: 2 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                name="nombre"
                value={datos.nombre}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Apellidos"
                variant="outlined"
                name="apellidos"
                value={datos.apellidos}
                onChange={handleChange}
              />
            </div>
            <FormControl>
              <InputLabel id="equipo">Equipo</InputLabel>
              <Select
                labelId="equipo"
                name="idequipo"
                value={datos.idequipo}
                onChange={handleChange}
                autoWidth
                displayEmpty
              >
                {equipos.map((equipo) => (
                  <MenuItem key={equipo.idequipo} value={equipo.idequipo}>
                    {equipo.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Posicion"
              variant="outlined"
              name="posicion"
              value={datos.posicion}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Sueldo"
              variant="outlined"
              name="sueldo"
              value={datos.sueldo}
              type="number"
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Fecha de inscripcion"
              variant="outlined"
              name="fecha_inscripcion"
              value={datos.fecha_inscripcion}
              type="date"
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={datos.disponible_jugar}
                  name="disponible_jugar"
                  onChange={handleChange}
                />
              }
              label="La jugadora esta disponible para jugar"
            />
            <Button variant="contained" color="inherit" type="submit">
              Guardar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default AltaJugadora;
