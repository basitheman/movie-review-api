// router.js
// Maps incoming HTTP requests to the correct controller function
// based on method and URL pattern.

const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("./controllers/movieController");

const { notFound, badRequest, serverError } = require("./utils/response");

/**
 * Parses the request body as JSON.
 * Returns a promise that resolves with the parsed object.
 */
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("Invalid JSON body."));
      }
    });
    req.on("error", reject);
  });
}

/**
 * Parses the URL path into segments.
 * Example: "/movies/42" → ["movies", "42"]
 */
function parsePath(url) {
  return url.split("?")[0].replace(/^\/|\/$/g, "").split("/");
}

/**
 * Main router — called by the HTTP server on every request.
 */
async function router(req, res) {
  const { method, url } = req;
  const segments = parsePath(url);

  // Only handle routes under /movies
  if (segments[0] !== "movies") {
    return notFound(res, `Route "${url}" does not exist.`);
  }

  const id = segments[1]; // may be undefined

  try {
    // ── GET /movies ────────────────────────────────────────────
    if (method === "GET" && !id) {
      return getAllMovies(req, res);
    }

    // ── GET /movies/:id ────────────────────────────────────────
    if (method === "GET" && id) {
      return getMovieById(req, res, id);
    }

    // ── POST /movies ───────────────────────────────────────────
    if (method === "POST" && !id) {
      const body = await parseBody(req);
      return createMovie(req, res, body);
    }

    // ── PUT /movies/:id ────────────────────────────────────────
    if (method === "PUT" && id) {
      const body = await parseBody(req);
      return updateMovie(req, res, id, body);
    }

    // ── DELETE /movies/:id ─────────────────────────────────────
    if (method === "DELETE" && id) {
      return deleteMovie(req, res, id);
    }

    // ── Catch-all for unsupported method/path combos ───────────
    notFound(res, `Cannot ${method} ${url}`);
  } catch (err) {
    if (err.message === "Invalid JSON body.") {
      return badRequest(res, "Request body must be valid JSON.");
    }
    serverError(res, err.message);
  }
}

module.exports = router;
