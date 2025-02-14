import { Box, Typography } from "@mui/material";
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
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
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
      <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 5}}>
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
