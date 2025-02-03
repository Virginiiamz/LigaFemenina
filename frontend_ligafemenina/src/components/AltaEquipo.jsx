import {
  Typography,
  TextField,
  Stack,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  Grid2,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

function AltaEquipo() {
  const [datos, setDatos] = useState({
    nombre: "",
    ciudad: "",
    urlimagen: "",
    esta_federado: false,
    dinero_transferencias: 0,
    fechacreacion: new Date(),
  });

  const navigate = useNavigate();

  const [validacion, setValidacion] = useState({
    dinero_transferencias: false,
  });

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();

    // Enviamos los datos mediante fetch
    if (validarDatos()) {
      try {
        const response = await fetch("http://localhost:3000/api/equipo/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });

        if (response.ok) {
          const respuesta = await response.json();
          alert(respuesta.mensaje);
          if (respuesta.ok) {
            navigate("/"); // Volver a la página principal
          }
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error:", error);
      }
    }
  };

  function validarDatos() {
    // En principio, damos por bueno el formulario
    let validado = true;
    // Estado de la validación auxiliar
    let validacionAux = {
      dinero_transferencias: false,
    };

    if (datos.dinero_transferencias < 0) {
      // Error en el dinero
      validacionAux.dinero_transferencias = true;
      // Formulario invalido
      validado = false;
    }

    // Actualizo el estado de la validacion de los Textfields
    setValidacion(validacionAux);
    console.log("Formulario valido:", validado);
    return validado;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatos({
      ...datos,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ m: 4 }}>
        Alta de equipo
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{ m: 2 }}
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
                label="Nombre"
                variant="outlined"
                name="nombre"
                value={datos.nombre}
                onChange={handleChange}
                required
              />
              <TextField
                id="outlined-basic"
                label="Ciudad"
                variant="outlined"
                name="ciudad"
                value={datos.ciudad}
                onChange={handleChange}
                required
              />
            </div>
            <TextField
              id="outlined-basic"
              label="Url de la imagen"
              variant="outlined"
              name="urlimagen"
              value={datos.urlimagen}
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Total dinero disponible para transferencias"
              variant="outlined"
              name="dinero_transferencias"
              value={datos.dinero_transferencias}
              type="number"
              onChange={handleChange}
              error={validacion.sueldo}
              helperText={
                validacion.sueldo && "El sueldo tiene que ser positivo"
              }
              required
            />
            <TextField
              id="outlined-basic"
              label="Fecha de creación"
              variant="outlined"
              name="fechacreacion"
              value={datos.fechacreacion}
              type="date"
              onChange={handleChange}
              required
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

            <Button variant="contained" color="inherit" type="submit">
              Guardar
            </Button>
          </Stack>
        </Grid2>
      </Grid>
    </>
  );
}

export default AltaEquipo;
