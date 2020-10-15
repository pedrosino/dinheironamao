// Busca todas
const getTodasDespesas = (req, res, db) => {
  /*const url = String(req.url);
  const table = url.replace(/\\|\//g,'');*/
  ////db.select('*').from('despesas').orderBy('data')
  db('despesas')
  .leftJoin('categorias', 'despesas.categoria_id', '=', 'categorias.id')
  .select('despesas.id', 'despesas.data', 'despesas.valor', 'despesas.descricao', 'categorias.nome', 'categorias.cor').orderBy('despesas.data')
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

// Salva nova
const postDespesa = (req, res, db) => {
  const { data, descricao, valor, local, observacao, categoria_id } = req.body
  //const added = new Date()

  const query = db('despesas').insert({data, descricao, valor, local, observacao, categoria_id})
  .returning('*');

  console.log(query.toString());

  //db('despesas').insert({data, descricao, valor, local, observacao, categoria_id})
    //.returning('*')
    query
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: err.message}))
}

// Atualiza
const putDespesa = (req, res, db) => {
  const { id, data, descricao, valor, local, observacao, categoria } = req.params
  db('despesas').where({id}).update({data, descricao, valor, local, observacao, categoria})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: err.message}))
}

const deleteDespesa = (req, res, db) => {
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
  postDespesa,
  putDespesa,
  deleteDespesa
}