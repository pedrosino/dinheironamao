import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import FormField from '../../components/FormField';

function Login() {
  const history = useHistory({forceRefresh: true});
  const initialValues = {
    email: '',
    senha: '',
  };

  //const { handleChange, values, clearForm } = useForm(initialValues);

  const [values, setValues] = useState(initialValues);

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

  function clearForm() {
    setValues(initialValues);
  }

  const URL_BACKEND = window.location.hostname.includes('localhost')
  ? 'http://localhost:3001'
  : 'https://pedromoney.herokuapp.com';

  return(
    <Layout>
      <div className="box">
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
              clearForm();
              history.push({
                pathname: '/',
                state: { item },
              });
            })
            .catch(err => console.log(err))

        }}>
          <FormField
            label="E-mail"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <FormField
            label="Senha"
            type="password"
            name="senha"
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
