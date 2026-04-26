// controllers/movieController.js
// Contains all CRUD handler functions for the Movie Review API

const { readMovies, writeMovies } = require("../utils/fileHelper");
const { ok, created, badRequest, notFound, serverError } = require("../utils/response");

// ─── READ ALL ────────────────────────────────────────────────────────────────

/**
 * GET /movies
 * Returns a list of all movies.
 */
function getAllMovies(req, res) {
  try {
    const movies = readMovies();
    ok(res, {
      count: movies.length,
      movies,
    });
  } catch (err) {
    serverError(res, "Failed to read movies data.");
  }
}

// ─── READ ONE ────────────────────────────────────────────────────────────────

/**
 * GET /movies/:id
 * Returns a single movie by its ID.
 */
function getMovieById(req, res, id) {
  try {
    const movies = readMovies();
    const movie = movies.find((m) => m.id === id);

    if (!movie) {
      return notFound(res, `Movie with ID "${id}" not found.`);
    }

    ok(res, movie);
  } catch (err) {
    serverError(res, "Failed to read movies data.");
  }
}

// ─── CREATE ──────────────────────────────────────────────────────────────────

/**
 * POST /movies
 * Adds a new movie. Expects JSON body with: title, director, year, genre, rating, review.
 */
function createMovie(req, res, body) {
  try {
    const { title, director, year, genre, rating, review } = body;

    // Validate required fields
    if (!title || !director || !year || !genre || !rating || !review) {
      return badRequest(
        res,
        "All fields are required: title, director, year, genre, rating, review."
      );
    }

    if (typeof rating !== "number" || rating < 0 || rating > 10) {
      return badRequest(res, "Rating must be a number between 0 and 10.");
    }

    const movies = readMovies();

    // Generate a unique ID based on timestamp
    const newMovie = {
      id: Date.now().toString(),
      title,
      director,
      year,
      genre,
      rating,
      review,
    };

    movies.push(newMovie);
    writeMovies(movies);

    created(res, {
      message: "Movie added successfully.",
      movie: newMovie,
    });
  } catch (err) {
    serverError(res, "Failed to create movie.");
  }
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────

/**
 * PUT /movies/:id
 * Updates an existing movie by ID. Partial updates are supported.
 */
function updateMovie(req, res, id, body) {
  try {
    const movies = readMovies();
    const index = movies.findIndex((m) => m.id === id);

    if (index === -1) {
      return notFound(res, `Movie with ID "${id}" not found.`);
    }

    // Validate rating if provided
    if (body.rating !== undefined) {
      if (typeof body.rating !== "number" || body.rating < 0 || body.rating > 10) {
        return badRequest(res, "Rating must be a number between 0 and 10.");
      }
    }

    // Merge existing data with updates (partial update support)
    const updatedMovie = { ...movies[index], ...body, id };
    movies[index] = updatedMovie;
    writeMovies(movies);

    ok(res, {
      message: "Movie updated successfully.",
      movie: updatedMovie,
    });
  } catch (err) {
    serverError(res, "Failed to update movie.");
  }
}

// ─── DELETE ──────────────────────────────────────────────────────────────────

/**
 * DELETE /movies/:id
 * Deletes a movie by its ID.
 */
function deleteMovie(req, res, id) {
  try {
    const movies = readMovies();
    const index = movies.findIndex((m) => m.id === id);

    if (index === -1) {
      return notFound(res, `Movie with ID "${id}" not found.`);
    }

    const deleted = movies.splice(index, 1)[0];
    writeMovies(movies);

    ok(res, {
      message: "Movie deleted successfully.",
      movie: deleted,
    });
  } catch (err) {
    serverError(res, "Failed to delete movie.");
  }
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
