// window.addEventListener("load", start);

// function start() {
//   console.log("Here we have a backend! 🤗");
// }

import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors()); 

app.listen(port, () => {
  console.log(`App listening on port ${port}, http://localhost:${port}`);
});

app.get("/", (request, response) => {
  response.send("smol backend app 🎉");
});

// Get all tracks
tracksRouter.get("/", async (request, response) => {
  const queryString =
    /*sql*/
    `
    SELECT DISTINCT tracks.*,
    artists.name as artistName,
    artists.id as artistID,
    albums.title as albumTitle,
    albums.id as albumID
FROM tracks
INNER JOIN artists_tracks ON tracks.id = artists_tracks.track_id
INNER JOIN artists ON artists_tracks.artist_id = artists.id
INNER JOIN albums_tracks ON tracks.id = albums_tracks.track_id
INNER JOIN albums ON albums_tracks.album_id = albums.id

ORDER BY tracks.title;
    `;

  response.json(await tryExecute(queryString));
  // const query =
  //   /*sql*/
  //   `
  //   SELECT DISTINCT tracks.*,
  //      artists.name as artistName,
  //      artists.id as artistId
  //   FROM tracks
  //   INNER JOIN artists_tracks ON tracks.id = artists_tracks.track_id
  //   INNER JOIN artists ON artists_tracks.artist_id = artists.id
  //   ORDER BY artists.id ASC;
  //   `;
  // response.json(await tryExecute(query));
});

// Get a single track
tracksRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const queryString =
    /* sql */
    `
        SELECT tracks.*,
            artists.name AS artistName,
            artists.id AS artistId,
            albums.title as albumTitle,
            albums.id as albumID
            FROM tracks
            INNER JOIN artists_tracks ON tracks.id = artists_tracks.track_id
            INNER JOIN artists ON artists_tracks.artist_id = artists.id
            INNER JOIN albums_tracks ON tracks.id = albums_tracks.track_id
            INNER JOIN albums ON albums_tracks.album_id = albums.id
            WHERE tracks.id = ?;
    `;

  const values = [id];

  response.json(await tryExecute(queryString, values));
});

