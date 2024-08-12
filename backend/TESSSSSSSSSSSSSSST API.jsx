import ApiService from "./ApiService";

const api = new ApiService("https://api.example.com");

// Request with Authorization (default behavior)

// GET request with Authorization
api
  .get("/private-data")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// POST request with Authorization
api
  .post("/private-data", { key: "value" })
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// PUT request with Authorization
api
  .put("/private-data/1", { key: "updatedValue" })
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// DELETE request with Authorization
api
  .delete("/private-data/1")
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// Request without Authorization

// GET request without Authorization
api
  .get("/public-data", false)
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// POST request without Authorization
api
  .post("/public-data", { key: "value" }, false)
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// PUT request without Authorization
api
  .put("/public-data/1", { key: "updatedValue" }, false)
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

// DELETE request without Authorization
api
  .delete("/public-data/1", false)
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
