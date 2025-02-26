/**
 * @fileoverview Componente para dar de alta nuevos equipos en la liga femenina
 * @author Tu Nombre
 * @version 1.0.0
 */

import {
  Typography,
  TextField,
  Stack,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  Grid2,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

/**
 * @typedef {Object} DatosEquipo
 * @property {string} nombre - Nombre del equipo
 * @property {string} ciudad - Ciudad donde se ubica el equipo
 * @property {string} urlimagen - URL de la imagen del equipo
 * @property {boolean} esta_federado - Indica si el equipo está federado
 * @property {number} dinero_transferencias - Presupuesto disponible para fichajes
 * @property {Date} fechacreacion - Fecha de creación del equipo
 */

/**
 * @typedef {Object} ValidacionEstado
 * @property {boolean} dinero_transferencias - Indica si hay error en el campo dinero
 */

/**
 * Componente para crear nuevos equipos en la liga
 * @component
 * @returns {JSX.Element} Formulario de alta de equipo
 */
function AltaEquipo() {
  // Estado inicial del formulario
  const [datos, setDatos] = useState({
    nombre: "",
    ciudad: "",
    urlimagen: "",
    esta_federado: false,
    dinero_transferencias: 0,
    fechacreacion: new Date(),
  });

  const navigate = useNavigate();

  // Estado para la validación de campos
  const [validacion, setValidacion] = useState({
    dinero_transferencias: false, // true indica error
  });

  /**
   * Maneja el envío del formulario
   * @async
   * @param {React.FormEvent} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validarDatos()) {
      try {
        // Realiza la petición POST al servidor
        const response = await fetch("http://localhost:3000/api/equipo/", {
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
      dinero_transferencias: false,
    };

    // Valida que el presupuesto sea positivo
    if (datos.dinero_transferencias < 0) {
      validacionAux.dinero_transferencias = true;
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
        Alta de equipo
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
                label="Ciudad"
                variant="outlined"
                name="ciudad"
                value={datos.ciudad}
                onChange={handleChange}
                required
              />
            </div>
            <TextField
              id="outlined-basic"
              label="Url de la imagen"
              variant="outlined"
              name="urlimagen"
              value={datos.urlimagen}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Total dinero disponible para transferencias"
              variant="outlined"
              name="dinero_transferencias"
              value={datos.dinero_transferencias}
              type="number"
              onChange={handleChange}
              error={validacion.sueldo}
              helperText={
                validacion.sueldo && "El sueldo tiene que ser positivo"
              }
              required
            />
            <TextField
              id="outlined-basic"
              label="Fecha de creación"
              variant="outlined"
              name="fechacreacion"
              value={datos.fechacreacion}
              type="date"
              onChange={handleChange}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={datos.esta_federado}
                  name="esta_federado"
                  onChange={handleChange}
                />
              }
              label="El equipo esta federado"
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

export default AltaEquipo;
