const Pool = require('pg').Pool
const db = new Pool({
  user: 'pedro',
  host: 'localhost',
  database: 'money',
  password: 'root',
  port: 5432,
});

const getDespesas = () => {
  return new Promise(function(resolve, reject) {
    db.query('SELECT * FROM despesas;', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    })
  }) 
}

const getDespesaById = (req) => {
  return new Promise(function(resolve, reject) {
    const { id } = req.params
    db.query('SELECT * FROM despesas WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const createDespesa = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, email } = body
    db.query('INSERT INTO despesas (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new merchant has been added added: ${results.rows[0]}`)
    })
  })
}

const deleteDespesa = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    db.query('DELETE FROM despesas WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Merchant deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getDespesas,
  getDespesaById,
  createDespesa,
  deleteDespesa,
}