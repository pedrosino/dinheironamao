const express = require('express');
const server = express();
const port = process.env.PORT || 3001;
const path = require('path');

/* Tutorial 2 */
/* https://medium.com/@olinations/build-a-crud-template-using-react-bootstrap-express-postgres-9f84cc444438 */

const bodyParser = require('body-parser');
const cors = require('cors');

// App Middleware
const whitelist = ['http://localhost:3000','https://pedromoney.herokuapp.com']
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

// db Connection w/ localhost
let db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'pedro',
    password : 'root',
    database : 'money'
  }
});

if (process.env.NODE_ENV === 'production') {
  // db Connection w/ Heroku
  db = require('knex')({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  });
}

// Thanks Jonatan
const staticFilesPath = path.resolve(__dirname, `./build`);

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(staticFilesPath));
}

const despesas = require('./despesas');
const categorias = require('./categorias');
const usuarios = require('./usuarios');

// *****Routes*****
// Despesas
// Buscar
server.get('/api/despesas', (req, res) => despesas.getTodasDespesas(req, res, db));
server.get('/api/despesas/:id', (req, res) => despesas.getDespesaById(req, res, db));
// Criar/atualizar
server.post('/api/despesa', (req, res) => despesas.novaDespesa(req, res, db));
server.put('/api/despesa', (req, res) => despesas.atualizaDespesa(req, res, db));

// Categorias
// Buscar
server.get('/api/categorias', (req, res) => categorias.getTodasCategorias(req, res, db));
server.get('/api/categorias/:id', (req, res) => categorias.getCategoriaById(req, res, db));
// Criar/atualizar
server.post('/api/categoria', (req, res) => categorias.novaCategoria(req, res, db));
server.put('/api/categoria', (req, res) => categorias.atualizaCategoria(req, res, db));

// Usuarios
server.get('/api/users', (req, res) => usuarios.getTodos(req, res, db));
server.post('/api/users/register', (req, res) => usuarios.registraUsuario(req, res, db));
server.post('/api/users/login', (req, res) => usuarios.logaUsuario(req, res, db));
server.get('/api/users/email/:email', (req, res) => usuarios.getUsuarioByEmail(req, res, db));
server.get('/api/users/id/:id', (req, res) => usuarios.getUsuarioById(req, res, db));


// Thanks again Jonatan
const indexHtmlPath = path.resolve(__dirname, './build/index.html');

server.get('/*', (req, res) => {
  res.sendFile(indexHtmlPath);
});
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
