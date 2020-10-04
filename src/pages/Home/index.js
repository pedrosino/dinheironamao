import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import { dateFormat } from '../../utils/date';
import moneyFormat from '../../utils/money';
import './ultimas.css';

function Home() {
  const [despesas, setDespesas] = useState([]);

  const URL_BACKEND = window.location.hostname.includes('localhost')
  ? 'http://localhost:3001'
  : 'https://pedromoney.herokuapp.com';

  function getDespesas() {
    return fetch(`${URL_BACKEND}/despesas`)
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
      {despesas.length === 0 && (<div>Loading...</div>)}
      <div className="box">
        <div className="ultimas">
          <p className="title">Últimas despesas</p>
          {/*<div className="linha">
            <div className="data">Data</div>
            <div className="principal">Descrição</div>
            <div className="valor">Valor</div>
          </div>
*/}
          {despesas.map((despesa, index) => (
                <div className="linha" key={index}>
                  <div className="data">{dateFormat(despesa.data.substring(0,10), 'short')}</div>
                  <div className="principal">
                    <span>{despesa.descricao}</span>
                    <span className="categoria" style={{background: `#${despesa.cor ? despesa.cor : "ddd"}`}}>{despesa.nome}</span></div>
                  <div className="valor">{moneyFormat(despesa.valor)}</div>
                </div>
              ))}
        </div>
      </div>
      <div className="box">Oi</div>
      <Button as={Link} to="/despesa/nova" cor={'var(--green)'}>
          Nova
        </Button>
    </Layout>
  );
}

export default Home;
