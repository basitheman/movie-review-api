
const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../data/movies.json");

/**
 * Reads all movies from the JSON file.
 * @returns {Array} Array of movie objects
 */
function readMovies() {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

/**
 * Writes the given array of movies to the JSON file.
 * @param {Array} movies - Array of movie objects to save
 */
function writeMovies(movies) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(movies, null, 2), "utf-8");
}

module.exports = { readMovies, writeMovies };
