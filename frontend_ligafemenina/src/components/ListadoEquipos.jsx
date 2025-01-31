import {
    Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";

function ListadoEquipos() {
  const [datos, setDatos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPlatos() {
      let response = await fetch("http://localhost:3000/api/equipo/");

      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      }
    }

    getPlatos();
  }, []); // Se ejecuta solo en el primer renderizado

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

  return (
    <>
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
              <TableCell align="center" colSpan={2}>
                ACCIONES
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.map((equipo) => (
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
                  {/* {equipo.urlimagen} */}
                </TableCell>
                <TableCell align="center">{equipo.nombre}</TableCell>
                <TableCell align="center">{equipo.ciudad}</TableCell>
                <TableCell align="center">
                  {equipo.dinero_transferencias}
                </TableCell>
                <TableCell align="center">{equipo.fechacreacion}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(equipo.idequipo)}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </TableCell>
                <TableCell align="center">{equipo.fechacreacion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ListadoEquipos;
