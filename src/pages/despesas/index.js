import React, { useState, useEffect, useCallback  } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import { dateFormat } from '../../utils/date';
import { moneyFormat } from '../../utils/money';
import '../../ultimas.css';

function Index() {
  const [despesas, setDespesas] = useState([]);

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
        console.log(error);
      });
  }, [getDespesas]);

  return(
    <Layout>
      <div className="box">
        <div className="ultimas">
          <p className="title">Últimas despesas</p>
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

export default Index;