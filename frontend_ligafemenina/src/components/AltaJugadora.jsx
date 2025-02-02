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
import { useNavigate } from "react-router";

function AltaJugadora() {
  const [datos, setDatos] = useState({
    nombre: "",
    apellidos: "",
    posicion: "",
    sueldo: 0,
    disponible_jugar: true,
    fechainscripcion: new Date(),
    idequipo: "",
  });
  const [equipos, setEquipos] = useState([]);
  const navigate = useNavigate();

  const [validacion, setValidacion] = useState({
    sueldo: false,
  });

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

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();

    console.log(datos);
    if (validarDatos()) {
      // Enviamos los datos mediante fetch
      try {
        const response = await fetch("http://localhost:3000/api/jugadora/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });

        if (response.ok) {
          const respuesta = await response.json();
          alert(respuesta.mensaje);
          if (respuesta.ok) {
            navigate("/"); // Volver a la página principal
          }
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error:", error);
      }
    }
  };

  function validarDatos() {
    // En principio, damos por bueno el formulario
    let validado = true;
    // Estado de la validación auxiliar
    let validacionAux = {
      sueldo: false,
    };

    if (datos.sueldo < 0) {
      // Error en el dinero
      validacionAux.sueldo = true;
      // Formulario invalido
      validado = false;
    }

    // Actualizo el estado de la validacion de los Textfields
    setValidacion(validacionAux);
    console.log("Formulario valido:", validado);
    return validado;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatos({
      ...datos,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ m: 4 }}>
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
            onSubmit={handleSubmit}
            sx={{ m: 2 }}
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
                required
              />
              <TextField
                id="outlined-basic"
                label="Apellidos"
                variant="outlined"
                name="apellidos"
                value={datos.apellidos}
                onChange={handleChange}
                required
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
                required
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
              required
            />
            <TextField
              id="outlined-basic"
              label="Sueldo"
              variant="outlined"
              name="sueldo"
              value={datos.sueldo}
              type="number"
              onChange={handleChange}
              required
              error={validacion.sueldo}
              helperText={
                validacion.sueldo &&
                "El sueldo tiene que ser positivo"
              }
            />
            <TextField
              id="outlined-basic"
              label="Fecha de inscripcion"
              variant="outlined"
              name="fechainscripcion"
              value={datos.fechainscripcion}
              type="date"
              onChange={handleChange}
              required
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
