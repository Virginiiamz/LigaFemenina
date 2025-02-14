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

function GraficaJugadoras() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function getDatosGraficaJugadoras() {
      let response = await fetch("http://localhost:3000/api/jugadora/grafica", {
        method: "GET",
      });

      if (response.ok) {
        let data = await response.json();

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
      <Box sx={{ mx: 4, mt: 2 }}>
        <Button variant="contained" color="inherit" onClick={generatePDF}>
          Imprimir listado (jsPDF + html2canvas)
        </Button>
      </Box>
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
