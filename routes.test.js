process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");
let fakeDb = require("./fakeDb");

let popsicle = { name: "popsicle", price:1.45 };

beforeEach(function() {
  fakeDb.push(popsicle);
});

afterEach(function() {
  // make sure this *mutates*, not redefines, `cats`
  fakeDb.length = 0;
});
// end afterEach



// Get
describe("GET /items", function() {
  test("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual([popsicle]);
  });
});


describe("GET /items/:name", function() {
  test("Gets a single item", async function() {
    const resp = await request(app).get(`/items/${popsicle.name}`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual(popsicle);
  });

test("Responds with 404 if can't find cat", async function() {
  const resp = await request(app).get(`/items/0`);
  expect(resp.statusCode).toBe(404);
  });
});


describe("POST /items", function() {
  test("Creates a new item", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({"name": "ben", "price": "3"});
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({"added": {"name": "ben", "price": "3"}});
  });
});



describe("DELETE /items/:name", function() {
  test("Deletes a single a item", async function() {
    const resp = await request(app).delete(`/items/${popsicle.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
});


describe("PATCH /items/:name", function() {
  test("Updates a single item", async function() {
    const resp = await request(app)
      .patch(`/items/${popsicle.name}`)
      .send({name: "ben"});
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({name: "ben", "price":"1.45"});
  });

  test("Responds with 404 if id invalid", async function() {
    const resp = await request(app).patch(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});


