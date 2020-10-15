// Busca todas
const getTodasCategorias = (req, res, db) => {
  /*const url = String(req.url);
  const table = url.replace(/\\|\//g,'');*/
  db.select('*').from('categorias').orderBy('nome')
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
const getCategoriaById = (req, res, db) => {
  const { id } = req.params;
  
  db.select('*').from('categorias').where({id})
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: err}))
}

const postCategoria = (req, res, db) => {
  const { first, last, email, phone, location, hobby } = req.params
  const added = new Date()
  db('categorias').insert({first, last, email, phone, location, hobby, added})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: err.message}))
}

const putCategoria = (req, res, db) => {
  const { id, first, last, email, phone, location, hobby } = req.params
  db('categorias').where({id}).update({first, last, email, phone, location, hobby})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: err.message}))
}

const deleteCategoria = (req, res, db) => {
  const { id } = req.params
  db('categorias').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: err.message}))
}

module.exports = {
  getTodasCategorias,
  getCategoriaById,
  postCategoria,
  putCategoria,
  deleteCategoria
}