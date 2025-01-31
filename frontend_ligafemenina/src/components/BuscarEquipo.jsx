import {
  Button,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

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

    // Enviamos los datos mediante fetch
    try {
      let response = await fetch(
        "http://localhost:3000/api/equipo/" +
          datos.ciudad +
          "/" +
          datos.esta_federado
      );
      if (response.ok) {
        let data = await response.json();
        setEquiposEncontrado(data.datos);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatos({
      ...datos,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Buscador de equipos
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{ mx: 2 }}
          >
            <TextField
              id="outlined-basic"
              label="Ciudad"
              variant="outlined"
              name="ciudad"
              value={datos.ciudad}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Switch checked={datos.esta_federado} name="esta_federado" onChange={handleChange} />}
              label="Equipo federado"
            />
            <Button variant="contained" color="inherit" type="submit">
              Buscar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default BuscarEquipo;
