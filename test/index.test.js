const app = require("../src/app");
const session = require("supertest");
const agent = session(app);
const users = require("../src/utils/users");

describe("Test de RUTAS", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      await agent.get("/rickandmorty/character/1").expect(200);
    });
    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
      const response = await agent.get("/rickandmorty/character/1");
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("species");
      expect(response.body).toHaveProperty("gender");
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("origin");
      expect(response.body).toHaveProperty("image");
    });
    it("Si hay un error responde con status: 500", async () => {
      await agent.get("/rickandmorty/character/1000").expect(500);
    });
  });

  describe("GET /rickandmorty/login", () => {
    it("La informacion del login es correcta", async () => {
      const response = (
        await agent.get(
          "/rickandmorty/login?email=pablo@pablo.com&password=111111"
        )
      ).body;
      expect(response.access).toEqual(true);
    });
    it("La informacion del login es incorrecta", async () => {
      const response = (
        await agent.get(
          "/rickandmorty/login?email=aaaa@aaaaa.com&password=jdjdjd"
        )
      ).body;
      expect(response.access).toEqual(false);
    });
  });

  describe("POST /rickandmorty/fav", () => {
    const character1 = { id: 1, name: "Pablo" };
    const character2 = { id: 1, name: "Ivan" };

    it("Agrega un personaje a favoritos", async () => {
      const response = await agent.post("/rickandmorty/fav").send(character1);
      expect(response.body).toContainEqual(character1);
    });
    it("Agrega dos personaje a favoritos", async () => {
      const response = await agent.post("/rickandmorty/fav").send(character2);
      expect(response.body).toContainEqual(character1);
      expect(response.body).toContainEqual(character2);
    });
  });

  describe("DELETE /rickandmorty/fav/:id", () => {
    const character1 = { id: 1, name: "Pablo" };
    const character2 = { id: 1, name: "Ivan" };

    it("Devuelve un arreglo con los personajes previos", async () => {
      const response = await agent.delete("/rickandmorty/fav/3");
      expect(response.body).toContainEqual(character1);
      expect(response.body).toContainEqual(character2);
    });
    it("Elimina un personaje de favoritos", async () => {
      const response = await agent.delete("/rickandmorty/fav/1");
      expect(response.body).not.toEqual(character1);
      expect(response.body).toContainEqual(character2);
    });
  });
});
