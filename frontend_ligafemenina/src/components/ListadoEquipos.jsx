/**
 * @fileoverview Componente para mostrar y gestionar el listado de equipos de la liga femenina
 * @author Tu Nombre
 * @version 1.0.0
 */

// Importaciones de Material-UI y otros componentes necesarios
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/EditNote";
import generatePDF from "../utils/GeneratePDF";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

/**
 * @typedef {Object} Equipo
 * @property {number} idequipo - ID único del equipo
 * @property {string} nombre - Nombre del equipo
 * @property {string} ciudad - Ciudad del equipo
 * @property {string} urlimagen - URL de la imagen del equipo
 * @property {number} dinero_transferencias - Presupuesto disponible
 * @property {string} fechacreacion - Fecha de creación del equipo
 */

/**
 * @typedef {Object} PDFStyles
 * @property {Object} page - Estilos de la página PDF
 * @property {Object} title - Estilos del título del PDF
 * @property {Object} table - Estilos de la tabla en PDF
 * @property {Object} tableRow - Estilos de las filas
 * @property {Object} tableColHeader - Estilos de las cabeceras
 * @property {Object} tableCol - Estilos de las columnas
 */

// Definición de estilos para el PDF
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
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ddd",
    padding: 5,
    fontWeight: "bold",
    fontSize: 8,
  },
  tableCol: { width: "100%", borderStyle: "solid", borderWidth: 1, padding: 5, fontSize: 8},
});

/**
 * Componente para generar el PDF del listado de equipos
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Array<Equipo>} props.data - Datos de los equipos a mostrar en el PDF
 * @returns {JSX.Element} Documento PDF formateado
 */
const ListadoEquiposPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Listado de equipos</Text>
      <View style={styles.table}>
        {/* Encabezado */}
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>IDEQUIPO</Text>
          <Text style={styles.tableColHeader}>NOMBRE</Text>
          <Text style={styles.tableColHeader}>CIUDAD</Text>
          <Text style={styles.tableColHeader}>DINERO</Text>
          <Text style={styles.tableColHeader}>FECHA CREACION</Text>
        </View>
        {data.map((row) => (
          <View style={styles.tableRow} key={row.idequipo}>
            <Text style={styles.tableCol}>{row.idequipo}</Text>
            <Text style={styles.tableCol}>{row.nombre}</Text>
            <Text style={styles.tableCol}>{row.ciudad}</Text>
            <Text style={styles.tableCol}>{row.dinero_transferencias}</Text>
            <Text style={styles.tableCol}>{row.fechacreacion}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

/**
 * Componente principal para mostrar y gestionar el listado de equipos
 * @component
 * @returns {JSX.Element} Interfaz con buscador, tabla y opciones de exportación
 */
function ListadoEquipos() {
  // Estado para almacenar todos los equipos
  const [datos, setDatos] = useState([]);
  // Estado para el ID del equipo a buscar
  const [equipoBuscado, setEquipoBuscado] = useState("");
  // Estado para almacenar el resultado de la búsqueda
  const [equipoEncontrado, setEquipoEncontrado] = useState(null);
  const navigate = useNavigate();

  /**
   * Efecto que carga los equipos al montar el componente
   */
  useEffect(() => {
    /**
     * Obtiene todos los equipos del servidor
     * @async
     */
    async function getEquipos() {
      let response = await fetch("http://localhost:3000/api/equipo/");

      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      }
    }

    getEquipos();
  }, []);

  /**
   * Maneja la búsqueda de un equipo por ID
   * @async
   * @param {React.FormEvent} e - Evento del formulario
   */
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

  /**
   * Elimina un equipo del sistema
   * @async
   * @param {number} idequipo - ID del equipo a eliminar
   */
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

  /**
   * Actualiza el estado del ID de equipo buscado
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio
   */
  const handleChange = (e) => {
    setEquipoBuscado(e.target.value);
  };

  // Renderizado del componente con sus diferentes secciones:
  // 1. Formulario de búsqueda
  // 2. Botones de exportación
  // 3. Tabla de equipos
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

      <Box sx={{ display: "flex", justifyContent: "start", gap: "1rem", m: 2 }}>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => window.print()}
        >
          Imprimir listado (navegador)
        </Button>
        <Button variant="contained" color="inherit" onClick={generatePDF}>
          Imprimir listado (jsPDF + html2canvas)
        </Button>
        <Button variant="contained" color="inherit">
          <PDFDownloadLink
            document={
              <ListadoEquiposPDF
                data={equipoEncontrado ? [equipoEncontrado] : datos}
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
