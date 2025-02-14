import {
  Box,
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
import generatePDF from "../utils/GeneratePDF";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Estilos del PDF
const styles = StyleSheet.create({
  page: { padding: 20 },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 10,
  },
  tableRow: { flexDirection: "row" },
  tableColHeader: {
    width: "16%",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ddd",
    padding: 5,
    fontWeight: "bold",
    fontSize: 8,
  },
  tableCol: { width: "16%", borderStyle: "solid", borderWidth: 1, padding: 5, fontSize: 8},
});

// Componente del documento PDF
const ListadoJugadorasPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Listado de jugadoras</Text>
      <View style={styles.table}>
        {/* Encabezado */}
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>IDJUGADORA</Text>
          <Text style={styles.tableColHeader}>NOMBRE</Text>
          <Text style={styles.tableColHeader}>APELLIDOS</Text>
          <Text style={styles.tableColHeader}>POSICION</Text>
          <Text style={styles.tableColHeader}>EQUIPO</Text>
          <Text style={styles.tableColHeader}>SUELDO</Text>
          <Text style={styles.tableColHeader}>FECHA INSCRIPCION</Text>
        </View>
        {data.map((row) => (
          <View style={styles.tableRow} key={row.idjugadora}>
            <Text style={styles.tableCol}>{row.idjugadora}</Text>
            <Text style={styles.tableCol}>{row.nombre}</Text>
            <Text style={styles.tableCol}>{row.apellidos}</Text>
            <Text style={styles.tableCol}>{row.posicion}</Text>
            <Text style={styles.tableCol}>{row.idequipo_equipo.nombre}</Text>
            <Text style={styles.tableCol}>{row.sueldo}</Text>
            <Text style={styles.tableCol}>{row.fechainscripcion}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

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

      <Box sx={{display: "flex", justifyContent: "start", gap: "1rem", m: 2}}>
        <Button variant="contained" color="inherit" onClick={() => window.print()}>
          Imprimir listado (navegador)
        </Button>
        <Button variant="contained" color="inherit" onClick={generatePDF}>
          Imprimir listado (jsPDF + html2canvas)
        </Button>
        <Button variant="contained" color="inherit">
          <PDFDownloadLink
            document={
              <ListadoJugadorasPDF
                data={jugadoraEncontrada ? [jugadoraEncontrada] : datos}
              />
            }
            fileName="tabla.pdf"
          >
            {({ loading }) =>
              loading ? "Generando PDF..." : "Imprimir listado (react-pdf)"
            }
          </PDFDownloadLink>
        </Button>
      </Box>

      <TableContainer component={Paper} id="pdf-content">
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
