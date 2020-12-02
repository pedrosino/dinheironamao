const bcrypt = require('bcrypt');

// Busca todos
const getTodos = (req, res, db) => {
  /*const url = String(req.url);
  const table = url.replace(/\\|\//g,'');*/
  db.select('*').from('users').orderBy('nome')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: err}))
}

// Busca por id
const getUsuarioById = (req, res, db) => {
  const { id } = req.params;

  console.log('Buscando por id ', id);
  
  db.select('*').from('users').where({id})
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: err}))
}

// Busca por email
const getUsuarioByEmail = (req, res, db) => {
  const { email } = req.params;

  console.log('Buscando por email ', email);
  
  db.select('*').from('users').where({email})
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: err}))
}

// Cria novo
const registraUsuario = (req, res, db) => {
  let { nome, email, senha } = req.body;

  bcrypt.hash(senha, 10, function(err, hash) {
    senha = hash;
    console.log('Senha: ', senha, ' - ', senha);

    const query = db('users').insert({nome, email, senha})
    .returning('*');

    console.log('Novo usuario: ', query.toString());

    query
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: err.message}));
  });
}

// Login
const logaUsuario = (req, res, db) => {
  let { email, senha } = req.body;

  console.log('Email: ', email);

  bcrypt.hash(senha, 10, function(err, hash) {
    senha = hash;
    console.log('Senha: ', senha, ' - ', senha);

    const query = db.select('*').from('users').where({email});

    console.log('Logando usuario: ', query.toString());

    query
      .then(items => {
        if(items.length){
          //****console.log(JSON.parse(items).email)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: err}))
  });
}

// Atualiza
const atualizaUsuario = (req, res, db) => {
  const { id, nome, email, senha } = req.body;

  const query = db('users').where({id}).update({nome, email, senha})
  .returning('*');

  console.log('Atualiza usuario: ', query.toString());

  //db('categorias').where({id}).update({nome, cor})
  //  .returning('*')
  query
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: err.message}))
}

const deletaUsuario = (req, res, db) => {
  const { id } = req.params
  db('users').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: err.message}))
}

module.exports = {
  getTodos,
  getUsuarioById,
  getUsuarioByEmail,
  registraUsuario,
  logaUsuario,
  atualizaUsuario,
  deletaUsuario
}
