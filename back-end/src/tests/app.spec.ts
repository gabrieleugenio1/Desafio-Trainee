import app from "../app";
import request from "supertest"; 

const PORT = process.env.PORT || 8080;

describe("Server initialization", () => {
  let server: any;

  beforeAll(() => {
    server = app.listen(PORT);
  });

  afterAll((done) => {
    server.close(done);
  });

  it("Deveria inciar o servidor", async () => {
    const response = await request(server).get("/"); 
    expect(response.status).toBe(404);
  });
});
