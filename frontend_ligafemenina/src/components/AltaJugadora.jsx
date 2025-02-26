/**
 * @fileoverview Componente para dar de alta nuevas jugadoras en la liga femenina
 * @author Tu Nombre
 * @version 1.0.0
 */

/**
 * @typedef {Object} DatosJugadora
 * @property {string} nombre - Nombre de la jugadora
 * @property {string} apellidos - Apellidos de la jugadora
 * @property {string} posicion - Posición en la que juega
 * @property {number} sueldo - Sueldo de la jugadora
 * @property {boolean} disponible_jugar - Indica si está disponible para jugar
 * @property {Date} fechainscripcion - Fecha de inscripción en el equipo
 * @property {string} idequipo - ID del equipo al que pertenece
 */

/**
 * @typedef {Object} ValidacionEstado
 * @property {boolean} sueldo - Indica si hay error en el campo sueldo
 */

/**
 * @typedef {Object} Equipo
 * @property {string} idequipo - ID único del equipo
 * @property {string} nombre - Nombre del equipo
 */

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

/**
 * Componente para crear nuevas jugadoras en la liga
 * @component
 * @returns {JSX.Element} Formulario de alta de jugadora
 */
function AltaJugadora() {
  // Estado inicial del formulario
  const [datos, setDatos] = useState({
    nombre: "",
    apellidos: "",
    posicion: "",
    sueldo: 0,
    disponible_jugar: true,
    fechainscripcion: new Date(),
    idequipo: "",
  });

  // Estado para almacenar la lista de equipos disponibles
  const [equipos, setEquipos] = useState([]);
  
  const navigate = useNavigate();

  // Estado para la validación de campos
  const [validacion, setValidacion] = useState({
    sueldo: false, // true indica error
  });

  /**
   * Efecto que carga la lista de equipos al montar el componente
   */
  useEffect(() => {
    /**
     * Obtiene la lista de equipos del servidor
     * @async
     */
    async function getEquipos() {
      let response = await fetch("http://localhost:3000/api/equipo/");

      if (response.ok) {
        let data = await response.json();
        setEquipos(data.datos);
      }
    }

    getEquipos();
  }, []);

  /**
   * Maneja el envío del formulario
   * @async
   * @param {React.FormEvent} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validarDatos()) {
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
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error:" + error);
      }
    }
  };

  /**
   * Valida los datos del formulario antes de enviar
   * @returns {boolean} true si los datos son válidos, false en caso contrario
   */
  function validarDatos() {
    let validado = true;
    let validacionAux = {
      sueldo: false,
    };

    // Valida que el sueldo sea positivo
    if (datos.sueldo < 0) {
      validacionAux.sueldo = true;
      validado = false;
    }

    setValidacion(validacionAux);
    return validado;
  }

  /**
   * Maneja los cambios en los campos del formulario
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio
   */
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
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
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
        </Grid2>
      </Grid>
    </>
  );
}

export default AltaJugadora;
