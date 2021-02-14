import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import FormField from '../../components/FormField';
//import FormSelect from '../../components/FormSelect';

function Ver() {
  const history = useHistory();
  const initialValues = {
    nome: '',
    cor: ''
  };

  const { id } = useParams();

  //const { handleChange, values, clearForm } = useForm(initialValues);

  const [values, setValues] = useState([]);

  // Busca dados
  const URL_BACKEND = window.location.hostname.includes('localhost')
  ? 'http://localhost:3001'
  : 'https://pedromoney.herokuapp.com';

  const getCategoria = useCallback( () => {
    return fetch(`${URL_BACKEND}/api/categorias/${id}`)
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
          const response = await serverResponse.json();
          return response;
        }
        throw new Error('Não foi possível obter os dados');
      });
  }, [URL_BACKEND, id]);

  useEffect(() => {      
    getCategoria()
      .then((dados) => {
        setValues(dados[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getCategoria]);

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

  return (
    <Layout>
      <div className="box">
        <p className="title">Ver categoria</p>
        <form className="form-nova-despesa" onSubmit={function handleSubmit(info) {
          info.preventDefault();
          /*setDados([
            ...dados,
            values,
          ]);*/

          fetch(`${URL_BACKEND}/api/categoria`, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: values.id,
              nome: values.nome,
              cor: values.cor
            })
          })
            .then(response => response.json())
            .then(item => {
              console.log("item ", item);
              clearForm();
              history.push({
                pathname: '/categorias',
                state: { item },
              });
            })
            .catch(err => console.log(err))
        }}>
          <FormField
            label="Nome"
            type="text"
            name="nome"
            value={values.nome}
            onChange={handleChange}
          />
          <FormField
            label="Cor"
            type="color"
            name="cor"
            value={values.cor}
            onChange={handleChange}
          />

          <p className="centro">Prévia:</p>
          <div className="categoria-lista centro" style={{backgroundColor: `${values.cor}`}}>
            {values.nome}
          </div>

          <div className="botoes">
            <Button type="submit" cor={'var(--green)'}>
              Salvar
            </Button>
            <Button as={Link} to="/categorias" cor={'var(--orange)'}>
              Voltar
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Ver;