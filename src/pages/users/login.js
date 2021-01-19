import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import FormField from '../../components/FormField';
import { UserContext } from '../../context';
//import { AuthContext } from '../../App.js';

function Login() {
  const history = useHistory({forceRefresh: true});
  const initialValues = {
    email: '',
    senha: '',
  };

  //const { handleChange, values, clearForm } = useForm(initialValues);

  const [values, setValues] = useState(initialValues);

  const [erros, setErros] = useState([]);

  function setValue(key, value) {
    // key describes the field
    setValues({
      ...values,
      [key]: value, //transforma key em um nome de propriedade
    })
  }

  function handleChange(info) {
    // verificar o que veio
    const {name, value} = info.target;
    setValue(name, value);
  }

  const URL_BACKEND = window.location.hostname.includes('localhost')
  ? 'http://localhost:3001'
  : 'https://pedromoney.herokuapp.com';

  // Verifica se a página anterior enviou um item
  const location = useLocation();
  console.log('Location ', location.pathname);
  const locationState = typeof(location.state) !== 'undefined'
  if (locationState)  
    console.log('Veio ', location.state.item);

  function closeMessage() {
    document.getElementById('message').style.display = 'none';
  }

  const [usuario, setUsuario] = React.useContext(UserContext);
  
  return(
    <Layout>
      <div className="box">
        <div id="message" className="mensagem sucesso">
          {locationState && (
            <>
              <span>Cadastro feito com sucesso!</span>
              <span className="close-message" onClick={closeMessage}>x</span>
            </>
          )}
        </div>
        <p className="title">Cadastro</p>
        <form className="" onSubmit={function handleSubmit(info) {
          info.preventDefault();

          // make post request with the data
          fetch(`${URL_BACKEND}/api/users/login`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: values.email,
              senha: values.senha,
            })
          })
            .then(response => response.json())
            .then(item => {
              console.log("item ", item);

              if(item.notFound === 'true') {
                let err = [{id: 'naoexiste', message: 'E-mail não encontrado'}];
                setErros(err);
                document.getElementById('email').focus();
              } else if (item.badPassword === 'true') {
                let err = [{id: 'senhaerrada', message: 'Senha incorreta'}];
                document.getElementById('senha').focus();
                setErros(err);
              } else {
                //dispatch action to context
                /*dispatch({
                  type: "LOGIN",
                  payload: item
                })*/
                setUsuario(item.nome);
                history.push({
                  pathname: '/',
                  state: { item },
                });
                
              }              
            })
            .catch(err => console.log(err))

        }}>
          <div className="erros">
            {erros.length > 0 && (
            <ul>
              <span>Houve erro(s) no preenchimento:</span>
              {erros.map((erro, index) => (
                <li key={index}>{erro.message}</li>
              ))}
            </ul>
            )}
          </div>

          <FormField
            label="E-mail"
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
          />
          <FormField
            label="Senha"
            type="password"
            name="senha"
            id="senha"
            value={values.senha}
            onChange={handleChange}
          />

          <div className="botoes">
            <Button type="submit" cor={'var(--green)'}>
              Entrar
            </Button>
          </div>
          <Link to="/users/register" className="link-centro">
            Faça seu cadastro aqui
          </Link>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
