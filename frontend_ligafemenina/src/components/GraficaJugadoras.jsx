/**
 * @fileoverview Componente que muestra una gráfica de barras con estadísticas de jugadoras por equipo
 * @author Tu Nombre
 * @version 1.0.0
 */

import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import generatePDF from "../utils/GeneratePDF";

/**
 * @typedef {Object} DatosGrafica
 * @property {number} cantidad - Número de jugadoras en el equipo
 * @property {string} nombre - Nombre del equipo
 */

/**
 * Componente que muestra una gráfica de barras con el número de jugadoras por equipo
 * @component
 * @returns {JSX.Element} Gráfica de barras y botón de impresión
 */
function GraficaJugadoras() {
  // Estado para almacenar los datos de la gráfica
  const [datos, setDatos] = useState([]);

  /**
   * Efecto que carga los datos para la gráfica al montar el componente
   */
  useEffect(() => {
    /**
     * Obtiene los datos para la gráfica desde el servidor
     * @async
     */
    async function getDatosGraficaJugadoras() {
      let response = await fetch("http://localhost:3000/api/jugadora/grafica", {
        method: "GET",
      });

      if (response.ok) {
        let data = await response.json();

        // Transforma los datos al formato requerido por el componente BarChart
        let datosGrafica = data.datos.map((fila) => {
          return {
            cantidad: parseInt(fila.cantidad),
            nombre: fila.nombre,
          };
        });
        setDatos(datosGrafica);
      }
    }

    getDatosGraficaJugadoras();
  }, []);

  return (
    <>
      {/* Botón para generar PDF de la gráfica */}
      <Box sx={{ mx: 4, mt: 2 }}>
        <Button variant="contained" color="inherit" onClick={generatePDF}>
          Imprimir listado (jsPDF + html2canvas)
        </Button>
      </Box>

      {/* Contenedor de la gráfica que será capturado para el PDF */}
      <Box
        id="pdf-content"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Numero de jugadoras por equipos
        </Typography>

        {/* Gráfica de barras usando recharts */}
        <BarChart
          width={500}
          height={500}
          data={datos}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          cx="50%"
          cy="50%"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="cantidad"
            fill="#4287f5"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </Box>
    </>
  );
}

export default GraficaJugadoras;
