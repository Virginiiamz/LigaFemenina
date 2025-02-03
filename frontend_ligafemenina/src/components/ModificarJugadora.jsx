import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function ModificarJugadora() {
  const params = useParams();

  const [datos, setDatos] = useState({
    idjugadora: params.idjugadora,
    nombre: "",
    apellidos: "",
    posicion: "",
    sueldo: 0,
    disponible_jugar: true,
    idequipo: "",
  });

  const [equipos, setEquipos] = useState([]);

  const navigate = useNavigate();

  const [validacion, setValidacion] = useState({
    sueldo: false,
  });

  useEffect(() => {
    async function getJugadoraById() {
      let response = await fetch(
        "http://localhost:3000/api/jugadora/" + datos.idjugadora
      );
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/");
      }
    }

    async function getEquipos() {
      let response = await fetch("http://localhost:3000/api/equipo/");

      if (response.ok) {
        let data = await response.json();
        setEquipos(data.datos);
      }
    }

    getEquipos();
    getJugadoraById();
  }, []);

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();
    console.log("Vamos a validar");
    if (validarDatos()) {
      // Enviamos los datos mediante fetch
      try {
        console.log("Vamos a hacer fetch");
        const response = await fetch(
          "http://localhost:3000/api/jugadora/" + datos.idjugadora,
          {
            method: "PUT", // "PATCH"
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
          }
        );

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
      sueldo: false,
    };

    if (datos.sueldo < 0) {
      // Error en el dinero
      validacionAux.sueldo = true;
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
        Modificar jugadora
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ my: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{ my: 2 }}
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
                label="Apellidos"
                variant="outlined"
                name="apellidos"
                value={datos.apellidos}
                onChange={handleChange}
                required
              />
            </div>
            <FormControl>
              <InputLabel id="equipo">Equipo</InputLabel>
              <Select
                labelId="equipo"
                name="idequipo"
                value={datos.idequipo}
                onChange={handleChange}
                autoWidth
                displayEmpty
                required
              >
                {equipos.map((equipo) => (
                  <MenuItem key={equipo.idequipo} value={equipo.idequipo}>
                    {equipo.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Posicion"
              variant="outlined"
              name="posicion"
              value={datos.posicion}
              onChange={handleChange}
              required
            />
            <TextField
              id="outlined-basic"
              label="Sueldo"
              variant="outlined"
              name="sueldo"
              value={datos.sueldo}
              type="number"
              onChange={handleChange}
              required
              error={validacion.sueldo}
              helperText={
                validacion.sueldo && "El sueldo tiene que ser positivo"
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={datos.disponible_jugar}
                  name="disponible_jugar"
                  onChange={handleChange}
                />
              }
              label="La jugadora esta disponible para jugar"
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

export default ModificarJugadora;
