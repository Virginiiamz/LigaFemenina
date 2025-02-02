import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
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

function BuscarJugadora() {
  const [datos, setDatos] = useState({
    idequipo: "",
    disponible_jugar: true,
  });
  const [jugadorasEncontradas, setJugadorasEncontradas] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const navigate = useNavigate();

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

    try {
      let response = await fetch(
        "http://localhost:3000/api/jugadora/equipo/" +
          datos.idequipo +
          "/disponible_jugar/" +
          datos.disponible_jugar
      );
      if (response.ok) {
        let data = await response.json();

        console.log(data.datos);

        setJugadorasEncontradas(data.datos); // Guardamos los equipos encontrados en el estado
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje); // Mostramos el mensaje en caso de que no haya equipos encontrados
        navigate("/"); // Redirigir a la página principal si la ciudad no tiene equipos
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error:", error); // Mostramos cualquier error que ocurra durante la búsqueda
    }
  };

  const handleDelete = async (idjugadora) => {
    let response = await fetch(
      "http://localhost:3000/api/jugadora/" + idjugadora,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      // Utilizando filter creo un array sin el plato borrado
      const trasBorrarJugadoras = jugadorasEncontradas.filter(
        (jugadora) => jugadora.idjugadora != idjugadora
      );
      // Establece los datos de nuevo para provocar un renderizado
      setJugadorasEncontradas(trasBorrarJugadoras);
      navigate("/buscadorjugadoras");
    }
  };

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
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
        </Grid>
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
