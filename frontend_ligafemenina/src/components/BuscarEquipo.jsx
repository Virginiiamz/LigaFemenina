import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Grid2,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/EditNote";

function BuscarEquipo() {
  const [datos, setDatos] = useState({
    ciudad: "",
    esta_federado: true,
  });
  const [equiposEncontrado, setEquiposEncontrado] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();

    try {
      let response = await fetch(
        "http://localhost:3000/api/equipo/ciudad/" +
          datos.ciudad +
          "/esta_federado/" +
          datos.esta_federado
      );
      if (response.ok) {
        let data = await response.json();

        console.log(data.datos);

        setEquiposEncontrado(data.datos); // Guardamos los equipos encontrados en el estado
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

  const handleDelete = async (idequipo) => {
    let response = await fetch("http://localhost:3000/api/equipo/" + idequipo, {
      method: "DELETE",
    });

    if (response.ok) {
      // Utilizando filter creo un array sin el plato borrado
      const trasBorrarEquipos = equiposEncontrado.filter(
        (equipo) => equipo.idequipo != idequipo
      );
      // Establece los datos de nuevo para provocar un renderizado
      setEquiposEncontrado(trasBorrarEquipos);
      navigate("/buscadorequipos");
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
        Buscador de equipos
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
            <TextField
              id="outlined-basic"
              label="Ciudad"
              variant="outlined"
              name="ciudad"
              value={datos.ciudad}
              onChange={handleChange}
              required
              sx={{ width: "100%" }}
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
            <Button sx={{ width: "20rem" }} variant="contained" color="inherit" type="submit">
              Buscar
            </Button>
          </Stack>
        </Grid2>
      </Grid>
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
            {equiposEncontrado?.map((equipo) => (
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

export default BuscarEquipo;
