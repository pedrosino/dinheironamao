import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import { dateFormat } from '../../utils/date';
import { moneyFormat } from '../../utils/money';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import './ultimas.css';

function Home() {
  const [despesas, setDespesas] = useState([]);

  const URL_BACKEND = window.location.hostname.includes('localhost')
  ? 'http://localhost:3001'
  : 'https://pedromoney.herokuapp.com';

  function getDespesas() {
    return fetch(`${URL_BACKEND}/api/despesas`)
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
          const response = await serverResponse.json();
          return response;
        }
        throw new Error('Não foi possível obter os dados');
      });
  }

  useEffect(() => {      
    getDespesas()
      .then((todas) => {
        setDespesas(todas);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return(
    <Layout>
      <div className="box">
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
                <Link key={despesa.id} to={`/despesa/${despesa.id}`}>
                <div className="linha" key={index}>
                  <div className="data">{dateFormat(despesa.data.substring(0,10), 'short')}</div>
                  <div className="principal">
                    <span>{despesa.descricao}</span>
                    <span className="categoria" style={{background: `#${despesa.cor ? despesa.cor : "ddd"}`}}>{despesa.nome}</span></div>
                  <div className="valor">{moneyFormat(despesa.valor)}</div>
                  {/*<Link className="icon" to={`/despesa/${despesa.id}`}>
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
          <FontAwesomeIcon icon={faEdit} />*/}
                </div>
                </Link>
              ))}
        </div>
        <Button as={Link} to="/despesa/nova" cor={'var(--green)'}>
          Nova despesa
        </Button>
      </div>
      <div className="box">Oi</div>
      
    </Layout>
  );
}

export default Home;
