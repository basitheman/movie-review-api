const { readMovies, writeMovies } = require("../utils/fileHelper");
const { ok, created, badRequest, notFound, serverError } = require("../utils/response");

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

function createMovie(req, res, body) {
  try {
    const { title, director, year, genre, rating, review } = body;

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


function updateMovie(req, res, id, body) {
  try {
    const movies = readMovies();
    const index = movies.findIndex((m) => m.id === id);

    if (index === -1) {
      return notFound(res, `Movie with ID "${id}" not found.`);
    }

    
    if (body.rating !== undefined) {
      if (typeof body.rating !== "number" || body.rating < 0 || body.rating > 10) {
        return badRequest(res, "Rating must be a number between 0 and 10.");
      }
    }

    
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
