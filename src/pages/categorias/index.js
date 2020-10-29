import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import './categorias.css';

function Index() {
  const history = useHistory();

  // Busca categorias
  const [categorias, setCategorias] = useState([]);

  const URL_BACKEND = window.location.hostname.includes('localhost')
  ? 'http://localhost:3001'
  : 'https://pedromoney.herokuapp.com';

  function getCategorias() {
    return fetch(`${URL_BACKEND}/api/categorias`)
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
          const response = await serverResponse.json();
          return response;
        }
        throw new Error('Não foi possível obter os dados');
      });
  }

  useEffect(() => {      
    getCategorias()
      .then((todas) => {
        setCategorias(todas);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return(
    <Layout>
      <div className="box">
        <p className="title">Categorias</p>

        {categorias.length === 0 && (<div>Loading...</div>)}
          {categorias.map((categoria, index) => (
                <Link key={categoria.id} to={`/categorias/${categoria.id}`}>
                  <div className="categoria-lista" style={{backgroundColor: `#${categoria.cor ? categoria.cor : ""}`}}>
                    {categoria.nome}
                  </div>
                </Link>
              ))}
              <Button>Nova</Button>
      </div>

    </Layout>
  );
}

export default Index;