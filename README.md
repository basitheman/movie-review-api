# 🎬 Movie Review REST API

A simple REST API built with **Node.js core modules only** (`http` + `fs`).  
No Express, no external frameworks — just pure Node.js.

---

## 📁 Project Structure

```
movie-review-api/
├── server.js                   ← Entry point, creates HTTP server
├── router.js                   ← URL routing logic
├── controllers/
│   └── movieController.js      ← CRUD handler functions
├── utils/
│   ├── fileHelper.js           ← fs read/write helpers
│   └── response.js             ← JSON response helpers
├── data/
│   └── movies.json             ← Persistent data store
└── package.json
```

---

## 🚀 Getting Started

```bash
# Start the server
node server.js

# Server runs at:
http://localhost:3000
```

---

## 📡 API Endpoints

### 1. Get All Movies
```
GET /movies
```
**Response 200:**
```json
{
  "count": 3,
  "movies": [
    {
      "id": "1",
      "title": "Inception",
      "director": "Christopher Nolan",
      "year": 2010,
      "genre": "Sci-Fi",
      "rating": 9.0,
      "review": "A mind-bending thriller..."
    }
  ]
}
```

---

### 2. Get Movie by ID
```
GET /movies/:id
```
**Response 200:**
```json
{
  "id": "1",
  "title": "Inception",
  ...
}
```
**Response 404:**
```json
{ "error": "Movie with ID \"99\" not found." }
```

---

### 3. Create a Movie
```
POST /movies
Content-Type: application/json
```
**Request Body:**
```json
{
  "title": "The Dark Knight",
  "director": "Christopher Nolan",
  "year": 2008,
  "genre": "Action",
  "rating": 9.0,
  "review": "A gripping superhero film elevated by an iconic villain."
}
```
**Response 201:**
```json
{
  "message": "Movie added successfully.",
  "movie": {
    "id": "1714123456789",
    "title": "The Dark Knight",
    ...
  }
}
```

---

### 4. Update a Movie
```
PUT /movies/:id
Content-Type: application/json
```
**Request Body** (partial updates supported):
```json
{
  "rating": 9.5,
  "review": "Updated review text here."
}
```
**Response 200:**
```json
{
  "message": "Movie updated successfully.",
  "movie": { ... }
}
```

---

### 5. Delete a Movie
```
DELETE /movies/:id
```
**Response 200:**
```json
{
  "message": "Movie deleted successfully.",
  "movie": { ... }
}
```

---

## 🧪 Testing with cURL

```bash
# Get all movies
curl http://localhost:3000/movies

# Get movie by ID
curl http://localhost:3000/movies/1

# Create a movie
curl -X POST http://localhost:3000/movies \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Dark Knight",
    "director": "Christopher Nolan",
    "year": 2008,
    "genre": "Action",
    "rating": 9.0,
    "review": "A gripping superhero film."
  }'

# Update a movie
curl -X PUT http://localhost:3000/movies/1 \
  -H "Content-Type: application/json" \
  -d '{"rating": 9.8, "review": "Even better on rewatch!"}'

# Delete a movie
curl -X DELETE http://localhost:3000/movies/1
```

---

## 📋 Movie Object Schema

| Field      | Type   | Required | Description                    |
|------------|--------|----------|--------------------------------|
| `id`       | string | auto     | Auto-generated unique ID       |
| `title`    | string | ✅       | Movie title                    |
| `director` | string | ✅       | Director's name                |
| `year`     | number | ✅       | Release year                   |
| `genre`    | string | ✅       | Genre (e.g. Drama, Sci-Fi)     |
| `rating`   | number | ✅       | Rating from 0 to 10            |
| `review`   | string | ✅       | Short review text              |

---

## ⚙️ Technical Details

- **Runtime:** Node.js (no external packages)
- **Modules used:** `http`, `fs`, `path`
- **Data store:** `data/movies.json` (flat file, synchronous I/O)
- **Port:** `3000` (override with `PORT` env variable)
