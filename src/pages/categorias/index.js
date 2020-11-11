import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import './categorias.css';

function Index() {

  // Busca categorias
  const [categorias, setCategorias] = useState([]);

  const URL_BACKEND = window.location.hostname.includes('localhost')
  ? 'http://localhost:3001'
  : 'https://pedromoney.herokuapp.com';

  const getCategorias = useCallback( () => {
    return fetch(`${URL_BACKEND}/api/categorias`)
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
          const response = await serverResponse.json();
          return response;
        }
        throw new Error('Não foi possível obter os dados');
      });
  }, [URL_BACKEND]);

  useEffect(() => {      
    getCategorias()
      .then((todas) => {
        setCategorias(todas);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getCategorias]);

  return(
    <Layout>
      <div className="box">
        <p className="title">Categorias</p>

        <div className="lista">
        {categorias.length === 0 && (<div>Loading...</div>)}
          {categorias.map((categoria, index) => (
                <div key={index} className="categoria-lista" style={{backgroundColor: `${categoria.cor ? categoria.cor : ""}`}}>
                  <Link key={categoria.id} to={`/categorias/${categoria.id}`}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  {categoria.nome}
                </div>
              ))}
        </div>
        <Button as={Link} to="/categorias/nova">Nova</Button>
      </div>

    </Layout>
  );
}

export default Index;