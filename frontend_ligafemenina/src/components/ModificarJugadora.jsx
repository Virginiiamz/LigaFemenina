/**
 * @fileoverview Componente para modificar los datos de una jugadora existente
 * @author Tu Nombre
 * @version 1.0.0
 */

/**
 * @typedef {Object} DatosJugadora
 * @property {string} idjugadora - ID único de la jugadora
 * @property {string} nombre - Nombre de la jugadora
 * @property {string} apellidos - Apellidos de la jugadora
 * @property {string} posicion - Posición en la que juega
 * @property {number} sueldo - Sueldo de la jugadora
 * @property {boolean} disponible_jugar - Indica si está disponible para jugar
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
import { useNavigate, useParams } from "react-router";

/**
 * Componente para modificar los datos de una jugadora existente
 * @component
 * @returns {JSX.Element} Formulario de modificación de jugadora
 */
function ModificarJugadora() {
  // Obtiene los parámetros de la URL para el ID de jugadora
  const params = useParams();

  /**
   * Estado inicial del formulario
   * @type {[DatosJugadora, Function]}
   */
  const [datos, setDatos] = useState({
    idjugadora: params.idjugadora,
    nombre: "",
    apellidos: "",
    posicion: "",
    sueldo: 0,
    disponible_jugar: true,
    idequipo: "",
  });

  /**
   * Estado para la lista de equipos disponibles
   * @type {[Array<Equipo>, Function]}
   */
  const [equipos, setEquipos] = useState([]);

  // Hook de navegación para redirecciones
  const navigate = useNavigate();

  /**
   * Estado para la validación de campos del formulario
   * @type {[ValidacionEstado, Function]}
   */
  const [validacion, setValidacion] = useState({
    sueldo: false, // true indica error
  });

  /**
   * Efecto que carga los datos iniciales de la jugadora y los equipos disponibles
   */
  useEffect(() => {
    /**
     * Obtiene los datos de la jugadora por su ID
     * @async
     */
    async function getJugadoraById() {
      let response = await fetch(
        "http://localhost:3000/api/jugadora/" + datos.idjugadora
      );
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/");
      }
    }

    /**
     * Obtiene la lista de equipos disponibles
     * @async
     */
    async function getEquipos() {
      let response = await fetch("http://localhost:3000/api/equipo/");

      if (response.ok) {
        let data = await response.json();
        setEquipos(data.datos);
      }
    }

    // Carga inicial de datos
    getEquipos();
    getJugadoraById();
  }, []);

  /**
   * Maneja el envío del formulario
   * @async
   * @param {React.FormEvent} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();
    console.log("Vamos a validar");
    if (validarDatos()) {
      // Enviamos los datos mediante fetch
      try {
        console.log("Vamos a hacer fetch");
        const response = await fetch(
          "http://localhost:3000/api/jugadora/" + datos.idjugadora,
          {
            method: "PUT", // "PATCH"
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
          }
        );

        if (response.ok) {
          // 204 No content
          alert("Actualización correcta");
          navigate(-1); // Volver a la ruta anterior
        } else {
          // 404 Not Found plato no modificado o no encontrado
          const data = await response.json();
          alert(data.mensaje);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error:", error);
      }
    }
  };

  /**
   * Valida los datos del formulario antes de enviar
   * @returns {boolean} true si los datos son válidos, false en caso contrario
   */
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

  // Renderizado del componente con Material-UI
  return (
    <>
      <Typography variant="h4" align="center" sx={{ m: 4 }}>
        Modificar jugadora
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ my: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{ my: 2 }}
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
                validacion.sueldo && "El sueldo tiene que ser positivo"
              }
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

export default ModificarJugadora;
