// Busca todas
const getTodasDespesas = (req, res, db) => {
  /*const url = String(req.url);
  const table = url.replace(/\\|\//g,'');*/
  ////db.select('*').from('despesas').orderBy('data')
  db('despesas')
  .join('categorias', 'despesas.categoria_id', '=', 'categorias.id')
  .select('despesas.data', 'despesas.valor', 'despesas.descricao', 'categorias.nome', 'categorias.cor').orderBy('despesas.data')
  .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: err.message}))
}

// Busca por id
const getDespesaById = (req, res, db) => {
  const { id } = req.params;
  
  db.select('*').from('despesas').where({id})
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: err.message}))
}

const postTableData = (req, res, db) => {
  const { first, last, email, phone, location, hobby } = req.params
  const added = new Date()
  db('despesas').insert({first, last, email, phone, location, hobby, added})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: err.message}))
}

const putTableData = (req, res, db) => {
  const { id, first, last, email, phone, location, hobby } = req.params
  db('despesas').where({id}).update({first, last, email, phone, location, hobby})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: err.message}))
}

const deleteTableData = (req, res, db) => {
  const { id } = req.params
  db('despesas').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: err.message}))
}

module.exports = {
  getTodasDespesas,
  getDespesaById,
  postTableData,
  putTableData,
  deleteTableData
}