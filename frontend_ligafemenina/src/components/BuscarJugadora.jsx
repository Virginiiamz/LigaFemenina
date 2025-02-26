/**
 * @fileoverview Componente para buscar y gestionar jugadoras de la liga femenina
 * @author Tu Nombre
 * @version 1.0.0
 */

/**
 * @typedef {Object} DatosBusqueda
 * @property {string} idequipo - ID del equipo para filtrar jugadoras
 * @property {boolean} disponible_jugar - Filtrar por disponibilidad para jugar
 */

/**
 * @typedef {Object} Jugadora
 * @property {number} idjugadora - ID único de la jugadora
 * @property {string} nombre - Nombre de la jugadora
 * @property {string} apellidos - Apellidos de la jugadora
 * @property {string} posicion - Posición en la que juega
 * @property {Object} idequipo_equipo - Datos del equipo al que pertenece
 * @property {number} sueldo - Sueldo de la jugadora
 * @property {string} fechainscripcion - Fecha de inscripción en el equipo
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
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/EditNote";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

/**
 * Componente para buscar y gestionar jugadoras
 * @component
 * @returns {JSX.Element} Interfaz de búsqueda y tabla de jugadoras
 */
function BuscarJugadora() {
  // Estado para los criterios de búsqueda
  const [datos, setDatos] = useState({
    idequipo: "",
    disponible_jugar: true,
  });

  // Estado para almacenar los resultados de la búsqueda
  const [jugadorasEncontradas, setJugadorasEncontradas] = useState([]);
  
  // Estado para almacenar la lista de equipos disponibles
  const [equipos, setEquipos] = useState([]);
  
  const navigate = useNavigate();

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
   * Maneja el envío del formulario de búsqueda
   * @async
   * @param {React.FormEvent} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza la petición GET al servidor con los filtros
      let response = await fetch(
        `http://localhost:3000/api/jugadora/equipo/${datos.idequipo}/disponible_jugar/${datos.disponible_jugar}`
      );
      
      if (response.ok) {
        let data = await response.json();
        setJugadorasEncontradas(data.datos);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error:" + error);
    }
  };

  /**
   * Elimina una jugadora por su ID
   * @async
   * @param {number} idjugadora - ID de la jugadora a eliminar
   */
  const handleDelete = async (idjugadora) => {
    let response = await fetch(
      `http://localhost:3000/api/jugadora/${idjugadora}`,
      { method: "DELETE" }
    );

    if (response.ok) {
      // Filtra la jugadora eliminada de la lista
      const trasBorrarJugadoras = jugadorasEncontradas.filter(
        (jugadora) => jugadora.idjugadora != idjugadora
      );
      setJugadorasEncontradas(trasBorrarJugadoras);
      navigate("/buscadorjugadoras");
    }
  };

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
      <Typography variant="h4" align="left" sx={{ m: 4 }}>
        Buscador de jugadoras
      </Typography>
      <Grid
        container
        sx={{ m: 4, justifyContent: "left", alignItems: "center" }}
      >
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{
              padding: "1rem",
              border: "2px solid gray",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="equipo">Equipo</InputLabel>
              <Select
                labelId="equipo"
                name="idequipo"
                value={datos.idequipo}
                onChange={handleChange}
                displayEmpty
                required
                fullWidth
              >
                {equipos.map((equipo) => (
                  <MenuItem key={equipo.idequipo} value={equipo.idequipo}>
                    {equipo.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <Button
              sx={{ width: "20rem" }}
              variant="contained"
              color="inherit"
              type="submit"
            >
              Buscar
            </Button>
          </Stack>
        </Grid2>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">IDJUGADORA</TableCell>
              <TableCell align="center">NOMBRE</TableCell>
              <TableCell align="center">APELLIDOS</TableCell>
              <TableCell align="center">POSICION</TableCell>
              <TableCell align="center">EQUIPO</TableCell>
              <TableCell align="center">SUELDO</TableCell>
              <TableCell align="center">FECHA DE INSCRIPCION</TableCell>
              <TableCell align="center">ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jugadorasEncontradas?.map((jugadora) => (
              <TableRow
                key={jugadora.idjugadora}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {jugadora.idjugadora}
                </TableCell>
                <TableCell align="center">{jugadora.nombre}</TableCell>
                <TableCell align="center">{jugadora.apellidos}</TableCell>
                <TableCell align="center">{jugadora.posicion}</TableCell>
                <TableCell align="center">
                  {jugadora.idequipo_equipo.nombre}
                </TableCell>
                <TableCell align="center">{jugadora.sueldo}</TableCell>
                <TableCell align="center">
                  {jugadora.fechainscripcion}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(jugadora.idjugadora)}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() =>
                      navigate("/modificarjugadora/" + jugadora.idjugadora)
                    }
                  >
                    <EditIcon fontSize="small" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default BuscarJugadora;
