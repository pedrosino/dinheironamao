import React, { useState, useEffect, useCallback  } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import { dateFormat } from '../../utils/date';
import { moneyFormat } from '../../utils/money';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../../ultimas.css';

function Home() {
  const [despesas, setDespesas] = useState([]);

  const [erro, setErro] = useState([]);

  const URL_BACKEND = window.location.hostname.includes('localhost')
  ? 'http://localhost:3001'
  : 'https://pedromoney.herokuapp.com';

  const getDespesas = useCallback( () => {
    return fetch(`${URL_BACKEND}/api/despesas`)
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
          const response = await serverResponse.json();
          return response;
        }
        throw new Error('Não foi possível obter os dados');
      });
  }, [URL_BACKEND]);

  useEffect(() => {      
    getDespesas()
      .then((todas) => {
        setDespesas(todas);
      })
      .catch((error) => {
        setErro(error.message);
      });
  }, [getDespesas]);

  const location = useLocation();

  console.log('Teste');
  console.log('Location ', location.pathname);
  const locationState = typeof(location.state) !== 'undefined'
  if (locationState)  
    console.log('Veio ', location.state.item);

  return(
    <Layout>
      <div style={{backgroundColor: '#ffa5a5',
                   color: '#800'}}>{erro}</div>
      <div className="box box-small">
        Menu
      </div>
      <div className="box box-medium">
        <div className="ultimas">
          <p className="title">Últimas despesas</p>
          {/*<div className="linha">
            <div className="data">Data</div>
            <div className="principal">Descrição</div>
            <div className="valor">Valor</div>
          </div>
*/}
          {despesas.length === 0 && (<div>Loading...</div>)}
          {despesas.map((despesa, index) => (
                <Link key={despesa.id} to={`/despesas/${despesa.id}`}>
                  <div className="linha" key={index}>
                    <div className="data">{dateFormat(despesa.data.substring(0,10), 'short')}</div>
                    <div className="principal">
                      <span>{despesa.descricao}</span>
                      <span className="categoria" style={{backgroundColor: `${despesa.cor ? despesa.cor : ""}`}}>{despesa.nome}</span></div>
                    <div className="valor">{moneyFormat(despesa.valor)}</div>
                    {/*<Link className="icon" to={`/despesa/${despesa.id}`}>
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
            <FontAwesomeIcon icon={faEdit} />*/}
                  </div>
                </Link>
              ))}
        </div>
        <Button as={Link} to="/despesas/nova" cor={'var(--green)'}>
          Nova despesa
        </Button>
      </div>
      
    </Layout>
  );
}

export default Home;
