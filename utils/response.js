
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


function ok(res, data) {
  sendJSON(res, 200, data);
}

function created(res, data) {
  sendJSON(res, 201, data);
}


function badRequest(res, message) {
  sendJSON(res, 400, { error: message });
}


function notFound(res, message = "Resource not found") {
  sendJSON(res, 404, { error: message });
}


function serverError(res, message = "Internal server error") {
  sendJSON(res, 500, { error: message });
}

module.exports = { ok, created, badRequest, notFound, serverError };
