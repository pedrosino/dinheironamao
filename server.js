const express = require('express');
const server = express();
const port = process.env.PORT || 3001;



/* Tutorial 2 */
/* https://medium.com/@olinations/build-a-crud-template-using-react-bootstrap-express-postgres-9f84cc444438 */

const bodyParser = require('body-parser');
const cors = require('cors');

// App Middleware
const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
server.use(cors(corsOptions))
server.use(bodyParser.json())

// db Connection w/ Heroku
const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});

// db Connection w/ localhost
/*var db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'pedro',
    password : 'root',
    database : 'money'
  }
});*/

const despesas = require('./despesas');
const categorias = require('./categorias');

// Routes
server.get('/despesas', (req, res) => despesas.getTodasDespesas(req, res, db));
server.get('/despesas/:id', (req, res) => despesas.getDespesaById(req, res, db));
server.get('/categorias', (req, res) => categorias.getTodasCategorias(req, res, db));
server.get('/categorias/:id', (req, res) => categorias.getCategoriaById(req, res, db));


//----------------------------------------------------------------------------

/* Tutorial 1
 https://blog.logrocket.com/getting-started-with-postgres-in-your-react-app/
*/

const main = require('./main');

server.use(express.json());
server.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

server.get('/all', (req, res) => {
  main.getDespesas()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(400).send(error.message);
  })
})

server.get('/all/:id', (req, res) => {
  main.getDespesaById(req)
  .then(response => {
    res.status(200).send(response);
    console.log('aqui', response);
  })
  .catch(error => {
    res.status(400).send(error.message);
  })
})


//-----------------------------------------//

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});