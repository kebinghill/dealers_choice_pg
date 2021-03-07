const pg = require('pg');
const db = new pg.Client('postgres://localhost/dc_pg_db');

const syncAndSeed = async () => {
  const SQL = `
  DROP TABLE IF EXISTS console;
  DROP TABLE IF EXISTS company;
   CREATE TABLE company(
     id INTEGER PRIMARY KEY,
     name VARCHAR(10) NOT NULL
   );
   CREATE TABLE console(
     id INTEGER PRIMARY KEY,
     name VARCHAR(50) NOT NULL,
     release_year INTEGER,
     company_id INTEGER REFERENCES company(id)
   );
   INSERT INTO company(id, name) VALUES(1, 'Sony');
   INSERT INTO company(id, name) VALUES(2, 'Microsoft');
   INSERT INTO company(id, name) VALUES(3, 'Nintendo');
   INSERT INTO company(id, name) VALUES(4, 'Atari');
   INSERT INTO company(id, name) VALUES(5, 'Sega');

   INSERT INTO console(id, name, release_year, company_id) VALUES(1, 'genesis', 1989, 5);
   INSERT INTO console(id, name, release_year, company_id) VALUES(2, '2600', 1977, 4);
   INSERT INTO console(id, name, release_year, company_id) VALUES(3, 'switch', 2019, 3);
   INSERT INTO console(id, name, release_year, company_id) VALUES(4, 'wii', 2006, 3);
   INSERT INTO console(id, name, release_year, company_id) VALUES(5, 'PS5', 2020, 1);
   INSERT INTO console(id, name, release_year, company_id) VALUES(6, 'PS1', 1994, 1);
   INSERT INTO console(id, name, release_year, company_id) VALUES(7, 'Xbox 360', 2005, 2);

  `;
  await db.query(SQL);
};

const connect = async () => {
  try {
    await db.connect();
    console.log('connected to DB');
    await syncAndSeed();
    console.log('seeded to DB');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  db,
  syncAndSeed,
  connect,
};
