const request = require("supertest");
const app = require("../index"); // Asegúrate de que apunta correctamente a tu servidor Express

describe("API de Jugadoras", () => {
  let idJugadoraCreada;

  // Prueba para obtener la gráfica de jugadoras
  test("GET /api/jugadora/grafica debería devolver la cantidad de jugadoras por equipo", async () => {
    const response = await request(app).get("/api/jugadora/grafica");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      ok: true,
      datos: expect.any(Array),
      mensaje: expect.any(String),
    });
  });

  // Prueba para obtener todas las jugadoras
  test("GET /api/jugadora debería devolver todas las jugadoras", async () => {
    const response = await request(app).get("/api/jugadora");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      ok: true,
      datos: expect.any(Array),
      mensaje: expect.any(String),
    });
  });

  // Prueba para crear una nueva jugadora
  test("POST /api/jugadora debería crear una nueva jugadora", async () => {
    const nuevaJugadora = {
      nombre: "María",
      apellidos: "González",
      posicion: "Delantera",
      sueldo: 50000,
      disponible_jugar: true,
      fechainscripcion: "2024-02-01",
      idequipo: 1, // Asegúrate de que este equipo existe en la DB
    };

    const response = await request(app)
      .post("/api/jugadora")
      .send(nuevaJugadora);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      ok: true,
      datos: expect.objectContaining({
        idjugadora: expect.any(Number),
      }),
      mensaje: expect.any(String),
    });

    idJugadoraCreada = response.body.datos.idjugadora;
  });

  // Prueba para obtener una jugadora por ID
  test("GET /api/jugadora/:idjugadora debería devolver una jugadora específica", async () => {
    const response = await request(app).get(
      `/api/jugadora/${idJugadoraCreada}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      ok: true,
      datos: expect.objectContaining({
        idjugadora: idJugadoraCreada,
      }),
      mensaje: expect.any(String),
    });
  });

  // Prueba para actualizar una jugadora
  test("PUT /api/jugadora/:idjugadora debería actualizar los datos de una jugadora", async () => {
    const datosActualizados = {
      idjugadora: idJugadoraCreada,
      nombre: "María Actualizada",
      apellidos: "González",
      posicion: "Centrocampista",
      sueldo: 60000,
      disponible_jugar: false,
      fechainscripcion: "2024-02-02",
      idequipo: 1,
    };

    const response = await request(app)
      .put(`/api/jugadora/${idJugadoraCreada}`)
      .send(datosActualizados);

    expect(response.status).toBe(204);
  });

  // Prueba para eliminar una jugadora
  test("DELETE /api/jugadora/:idjugadora debería eliminar una jugadora", async () => {
    const response = await request(app).delete(
      `/api/jugadora/${idJugadoraCreada}`
    );

    expect(response.status).toBe(204);
  });

  // Prueba para intentar obtener una jugadora eliminada (debería devolver 404)
  test("GET /api/jugadora/:idjugadora después de eliminar debería devolver 404", async () => {
    const response = await request(app).get(
      `/api/jugadora/${idJugadoraCreada}`
    );

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      ok: false,
      datos: null,
      mensaje: expect.any(String),
    });
  });
});
