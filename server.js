
const http = require("http");
const router = require("./router");

const PORT = process.env.PORT || 3000;
const HOST = "localhost";

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  router(req, res);
});

server.listen(PORT, HOST, () => {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  🎬  Movie Review REST API");
  console.log(`  Server running at http://${HOST}:${PORT}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  Available Routes:");
  console.log("  GET    /movies         → Get all movies");
  console.log("  GET    /movies/:id     → Get movie by ID");
  console.log("  POST   /movies         → Add a new movie");
  console.log("  PUT    /movies/:id     → Update a movie");
  console.log("  DELETE /movies/:id     → Delete a movie");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
});
