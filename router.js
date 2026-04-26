
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("./controllers/movieController");

const { notFound, badRequest, serverError } = require("./utils/response");


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


function parsePath(url) {
  return url.split("?")[0].replace(/^\/|\/$/g, "").split("/");
}


async function router(req, res) {
  const { method, url } = req;
  const segments = parsePath(url);

  if (segments[0] !== "movies") {
    return notFound(res, `Route "${url}" does not exist.`);
  }

  const id = segments[1]; 

  try {
    
    if (method === "GET" && !id) {
      return getAllMovies(req, res);
    }

    if (method === "GET" && id) {
      return getMovieById(req, res, id);
    }

    
    if (method === "POST" && !id) {
      const body = await parseBody(req);
      return createMovie(req, res, body);
    }

    if (method === "PUT" && id) {
      const body = await parseBody(req);
      return updateMovie(req, res, id, body);
    }

    
    if (method === "DELETE" && id) {
      return deleteMovie(req, res, id);
    }

    
    notFound(res, `Cannot ${method} ${url}`);
  } catch (err) {
    if (err.message === "Invalid JSON body.") {
      return badRequest(res, "Request body must be valid JSON.");
    }
    serverError(res, err.message);
  }
}

module.exports = router;
