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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/EditNote";

function ListadoEquipos() {
  const [datos, setDatos] = useState([]);
  const [equipoBuscado, setEquipoBuscado] = useState("");
  const [equipoEncontrado, setEquipoEncontrado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getEquipos() {
      let response = await fetch("http://localhost:3000/api/equipo/");

      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      }
    }

    getEquipos();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();

    // Enviamos los datos mediante fetch
    try {
      let response = await fetch(
        "http://localhost:3000/api/equipo/" + equipoBuscado
      );
      if (response.ok) {
        let data = await response.json();
        setEquipoEncontrado(data.datos);
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

  const handleDelete = async (idequipo) => {
    let response = await fetch("http://localhost:3000/api/equipo/" + idequipo, {
      method: "DELETE",
    });

    if (response.ok) {
      // Utilizando filter creo un array sin el plato borrado
      const trasBorrarEquipos = datos.filter(
        (equipo) => equipo.idequipo != idequipo
      );
      // Establece los datos de nuevo para provocar un renderizado
      setDatos(trasBorrarEquipos);
    }
  };

  const handleChange = (e) => {
    setEquipoBuscado(e.target.value);
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
              name="idequipo"
              value={equipoBuscado}
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
              <TableCell align="center">IDEQUIPO</TableCell>
              <TableCell align="center">IMAGEN</TableCell>
              <TableCell align="center">NOMBRE</TableCell>
              <TableCell align="center">CIUDAD</TableCell>
              <TableCell align="center">DINERO DISPONIBLE</TableCell>
              <TableCell align="center">FECHA DE CREACION</TableCell>
              <TableCell align="center">ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(equipoEncontrado ? [equipoEncontrado] : datos).map((equipo) => (
              <TableRow
                key={equipo.idequipo}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {equipo.idequipo}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  <img
                    style={{ width: "32px" }}
                    srcSet={`${equipo.urlimagen}?w=32&h=32&fit=crop&auto=format&dpr=2`}
                    src={`${equipo.urlimagen}?w=32&h=32fit=crop&auto=format`}
                    alt={equipo.nombre}
                    loading="lazy"
                  />
                </TableCell>
                <TableCell align="center">{equipo.nombre}</TableCell>
                <TableCell align="center">{equipo.ciudad}</TableCell>
                <TableCell align="center">
                  {equipo.dinero_transferencias}
                </TableCell>
                <TableCell align="center">{equipo.fechacreacion}</TableCell>
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
                    onClick={() => handleDelete(equipo.idequipo)}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() =>
                      navigate("/modificarequipo/" + equipo.idequipo)
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

export default ListadoEquipos;
