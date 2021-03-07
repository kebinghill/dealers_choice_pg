const express = require('express');
const { connect, db, syncAndSeed } = require('./db.js');
const path = require('path');

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res, next) => {
  try {
    const response = await db.query('SELECT * FROM company;');
    const companies = response.rows;

    res.send(`
      <html>
        <head>
        <link rel='stylesheet' href='/public/style.css'/>
        </head>
        <body>
          <h1>Console Wars</h1>
          <ul>
            ${companies
              .map(
                (company) => `

            <li>
            <a href='/companies/${company.id}'>
            ${company.name}
            </a>
            </li>
            `
              )
              .join('')}
          </ul>
        </body>
      </html>
    `);
  } catch (err) {
    next();
  }
});

app.get('/companies/:id', async (req, res, next) => {
  try {
    const response = await db.query(
      'SELECT * FROM console WHERE company_id=$1;',
      [req.params.id]
    );
    const responseTwo = await db.query('SELECT * FROM company WHERE id=$1;', [
      req.params.id,
    ]);
    const company = responseTwo.rows;
    const consoles = response.rows;

    res.send(`
      <html>
        <head>
        <link rel='stylesheet' href='/public/style.css'/>
        </head>
        <body>
        ${company.map(
          (company) => `
        <h1><a href='/'>${company.name} Consoles</a></h1>
        `
        )}
          <ul>
            ${consoles
              .map(
                (console) => `

            <li>
            <a href='/'>
            ${console.name}
            </a>
            <p>released in: ${console.release_year}</p>
            </li>
            `
              )
              .join('')}
          </ul>
        </body>
      </html>
    `);
  } catch (err) {
    next();
  }
});

const init = async () => {
  try {
    connect();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

init();
