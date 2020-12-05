import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import FormField from '../../components/FormField';

function Register() {
  const history = useHistory({forceRefresh: true});
  const initialValues = {
    nome: '',
    email: '',
    senha: '',
    confirmaSenha: ''
  };

  //const { handleChange, values, clearForm } = useForm(initialValues);

  const [values, setValues] = useState(initialValues);

  const [erros, setErros] = useState([]);

  const [senhas, setSenhas] = useState(true);

  function setValue(key, value) {
    // key describes the field
    setValues({
      ...values,
      [key]: value, //transforma key em um nome de propriedade
    })
  }

  // Valida formulário
  function validaForm() {
    let err = [];

    if (!values.nome || !values.email || !values.senha || !values.confirmaSenha) {
      err.push({id: 'vazio', message: 'Preencha todos os campos'});
    }

    if (values.senha.length < 8) {
      err.push({id: 'curta', message: 'A senha deve ter no mínimo 8 caracteres'});
    }

    if (verificaSenhas(values.senha, values.confirmaSenha) === false)
      err.push({id: 'diferentes', message: 'As senhas não conferem'});

    setErros(err);

    return err.length;
  }

  function verificaSenhas(valor1, valor2) {
    let certo = true;
    if (valor1 !== valor2 && valor1.length && valor2.length)
      certo = false;
    
    return certo;
  }

  function handleChange(info) {
    // verificar o que veio
    const {name, value} = info.target;
    setValue(name, value);

    if (name === 'senha') {
      setSenhas(verificaSenhas(value, values.confirmaSenha));

    }
    if (name === 'confirmaSenha') {
      setSenhas(verificaSenhas(value, values.senha));
    }
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

          let countErrors = validaForm();

          if (countErrors === 0) {
            // make post request with the data
            fetch(`${URL_BACKEND}/api/users/register`, {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                nome: values.nome,
                email: values.email,
                senha: values.senha,
              })
            })
              .then(response => response.json())
              .then(item => {
                if(item.alreadyRegistered === 'true') {
                  let err = [{id: 'existe', message: 'E-mail já cadastrado'}];
                  setErros(err);
                } else {
                  history.push({
                    pathname: '/users/login',
                    state: { item },
                  });
                }                
              })
              .catch(err => console.log(err))
          }

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
            label="Nome"
            type="text"
            name="nome"
            value={values.nome}
            onChange={handleChange}
          />
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
            erro={!senhas}
          />
          <FormField
            label="Confirme a senha"
            type="password"
            name="confirmaSenha"
            value={values.confirmaSenha}
            onChange={handleChange}
            erro={!senhas}
          />
          
          <div className={`erros ${!senhas ? "mostra-erro" : "esconde-erro"}`} >
            <span>As senhas estão diferentes</span>
          </div>

          <div className="botoes">
            <Button type="submit" cor={'var(--green)'}>
              Cadastrar
            </Button>
            <Button as={Link} to="/" cor={'var(--orange)'}>
              Cancelar
            </Button>
          </div>
          <Link to="/users/login" className="link-centro">
            Já tem cadastro? Faça seu login
          </Link>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
