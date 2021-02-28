const pg = require('pg');
const express = require('express');
const { syncAndSeed } = require('./db');
const db = new pg.Client('postgres://localhost/dc_pg_db');

const app = express();

app.get('/', async (req, res) => {
  res.send('hello world');
});

const init = async () => {
  try {
    await db.connect();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port: ${port}`));
  } catch (error) {
    console.log(error);
    ß;
  }
};

init();
