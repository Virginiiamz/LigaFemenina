import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function ModificarEquipo() {
  const params = useParams();

  const [datos, setDatos] = useState({
    idequipo: params.idequipo,
    nombre: "",
    ciudad: "",
    urlimagen: "",
    esta_federado: false,
    dinero_transferencias: 0,
  });
  
  const [validacion, setValidacion] = useState({
    nombre: false, // true si hay error
    descripcion: false,
    precio: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function getEquipoById() {
      let response = await fetch("http://localhost:3000/api/equipo/" + datos.idequipo);
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/"); // Volver a la página principal por ruta erronea
      }
    }

    getEquipoById();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();
    console.log("Vamos a validar");
    if (validarDatos()) {
      // Enviamos los datos mediante fetch
      try {
        console.log("Vamos a hacer fetch");
        const response = await fetch("http://localhost:3000/api/equipo/" + datos.idequipo, {
          method: "PUT", // "PATCH"
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });

        if (response.ok) {
          // 204 No content
          alert("Actualización correcta");
          navigate(-1); // Volver a la ruta anterior
        } else {
          // 404 Not Found plato no modificado o no encontrado
          const data = await response.json();
          alert(data.mensaje);
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
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Modificar equipo
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
              />
              <TextField
                id="outlined-basic"
                label="Ciudad"
                variant="outlined"
                name="ciudad"
                value={datos.ciudad}
                onChange={handleChange}
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
              error={validacion.dinero_transferencias}
              helperText={
                validacion.dinero_transferencias && "El dinero tiene que ser positivo"
              }
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
        </Grid>
      </Grid>
    </>
  );
}

export default ModificarEquipo;
