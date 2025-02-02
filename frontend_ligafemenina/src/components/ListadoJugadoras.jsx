import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/EditNote";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function ListadoJugadoras() {
  const [datos, setDatos] = useState([]);
  const [jugadoraBuscada, setJugadoraBuscada] = useState("");
  const [jugadoraEncontrada, setJugadoraEncontrada] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getJugadoras() {
      let response = await fetch("http://localhost:3000/api/jugadora/");

      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      }
    }

    getJugadoras();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();

    // Enviamos los datos mediante fetch
    try {
      let response = await fetch(
        "http://localhost:3000/api/jugadora/" + jugadoraBuscada
      );
      if (response.ok) {
        let data = await response.json();
        setJugadoraEncontrada(data.datos);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/"); // Volver a la página principal por ruta erronea
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error:", error);
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
      const trasBorrarJugadoras = datos.filter(
        (jugadora) => jugadora.idjugadora != idjugadora
      );
      // Establece los datos de nuevo para provocar un renderizado
      setDatos(trasBorrarJugadoras);
    }
  };

  const handleChange = (e) => {
    setJugadoraBuscada(e.target.value);
  };

  return (
    <>
      <div style={{ marginTop: "2rem" }}>
        <Stack
          component="form"
          spacing={2}
          onSubmit={handleSubmit}
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
              label="Buscar por id"
              variant="outlined"
              name="idjugadora"
              value={jugadoraBuscada}
              sx={{ width: "100%" }}
              onChange={handleChange}
              required
            />
            <Button variant="contained" color="inherit" type="submit">
              Buscar
            </Button>
          </div>
        </Stack>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            {(jugadoraEncontrada ? [jugadoraEncontrada] : datos).map(
              (jugadora) => (
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
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ListadoJugadoras;
