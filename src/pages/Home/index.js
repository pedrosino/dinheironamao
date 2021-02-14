import React, { useState, useEffect, useCallback} from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import { dateFormat } from '../../utils/date';
import { moneyFormat } from '../../utils/money';
import { UserContext } from '../../context.js';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../../ultimas.css';

function Home() {
  const [despesas, setDespesas] = useState([]);

  const [erro, setErro] = useState([]);

  // Busca o contexto do usuario
  const [usuario] = React.useContext(UserContext);
  const logado = usuario !== 0;
  console.log('Logado: ', logado);

  const URL_BACKEND = window.location.hostname.includes('localhost')
  ? 'http://localhost:3001'
  : 'https://pedromoney.herokuapp.com';

  const getDespesas = useCallback( () => {
    return fetch(`${URL_BACKEND}/api/despesas?user=${encodeURIComponent(usuario)}`, {
      method: 'get',
    })
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
          const response = await serverResponse.json();
          return response;
        }
        throw new Error('Não foi possível obter os dados');
      });
  }, [URL_BACKEND, usuario]);

  useEffect(() => {      
    getDespesas()
      .then((todas) => {
        if(todas.dataExists !== 'false')
          setDespesas(todas);
        else
          setDespesas(['']);
      })
      .catch((error) => {
        setErro(error.message);
      });
  }, [getDespesas]);

  
  // Busca nome do usuario salvo no localStorage
  const nome = localStorage.getItem('usuario');

  // verifica se a página anterior enviou informações
  const location = useLocation();
  console.log('Location ', location.pathname);
  const locationState = typeof(location.state) !== 'undefined'
  if (locationState) {
    console.log('Veio ', location.state.item);

    /*if (location.state.item.nome) {
      dispatch(location.state.item.id);
    }*/
  }

  return(
    <Layout>
      <div className="erros">
        {erro}
      </div>
      <div className="mensagem sucesso">
        { typeof(location.state) !== 'undefined' && (
          <span>Bem vindo, {location.state.item.nome}</span>
        ) }
      </div>
      <div className="box box-small">
        Menu<br/>
        Hi {usuario}! Seu nome é {nome}.
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
          {despesas.length === 1 ? (<div>Nenhuma despesa encontrada</div>)
          :
          despesas.map((despesa, index) => (
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
        <Button as={Link} to="/despesas/nova" >
          Nova despesa
        </Button>
      </div>
      
    </Layout>
  );
}

export default Home;
