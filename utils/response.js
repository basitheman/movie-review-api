// utils/response.js
// Helper functions for sending consistent JSON HTTP responses

/**
 * Sends a JSON response with the given status code and data.
 * @param {ServerResponse} res
 * @param {number} statusCode
 * @param {Object} data
 */
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, null, 2));
}

/**
 * Sends a 200 OK response.
 */
function ok(res, data) {
  sendJSON(res, 200, data);
}

/**
 * Sends a 201 Created response.
 */
function created(res, data) {
  sendJSON(res, 201, data);
}

/**
 * Sends a 400 Bad Request response.
 */
function badRequest(res, message) {
  sendJSON(res, 400, { error: message });
}

/**
 * Sends a 404 Not Found response.
 */
function notFound(res, message = "Resource not found") {
  sendJSON(res, 404, { error: message });
}

/**
 * Sends a 500 Internal Server Error response.
 */
function serverError(res, message = "Internal server error") {
  sendJSON(res, 500, { error: message });
}

module.exports = { ok, created, badRequest, notFound, serverError };
