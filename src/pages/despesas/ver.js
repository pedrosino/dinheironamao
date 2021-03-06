import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import FormField from '../../components/FormField';
import FormSelect from '../../components/FormSelect';
import { getCurrentDate, dateSave, dateFormat } from '../../utils/date';
import { saveFormat } from '../../utils/money';
import { moneyFormat } from '../../utils/money';
import { UserContext } from '../../context.js';
//import TextField from '@material-ui/core/TextField';
//import Autocomplete from '@material-ui/lab/Autocomplete';
import './despesa.css';

function Ver() {
  const history = useHistory();
  const initialValues = {
    data: getCurrentDate("/"),
    descricao: '',
    valor: '',
    local: '',
    observacao: '',
    categoria_id: 0
  };

  const { id } = useParams();

  //const { handleChange, values, clearForm } = useForm(initialValues);

  const [values, setValues] = useState([]);

  function parseValues(input) {
    let output = [];

    var key;
    for (key in input) {
      //treat values
      let value = input[key];
      if (value === null) {
        output[key] = '';
      }
      else if (key === 'data') {
        output[key] = dateFormat(value, "long");
      }
      else if (key === 'valor') {
        output[key] = moneyFormat(value);
      }
      else {
        output[key] = input[key];
      }
    }

    return output;
  }

  // Busca dados
  const URL_BACKEND = window.location.hostname.includes('localhost')
  ? 'http://localhost:3001'
  : 'https://pedromoney.herokuapp.com';

  const getDespesa = useCallback( () => {
    return fetch(`${URL_BACKEND}/api/despesas/${id}`)
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
          const response = await serverResponse.json();
          return response;
        }
        throw new Error('Não foi possível obter os dados');
      });
  }, [URL_BACKEND, id]);

  useEffect(() => {      
    getDespesa()
      .then((dados) => {
        let resultado = parseValues(dados[0]);
        setValues(resultado);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getDespesa]);

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

  // Busca categorias
  const [categorias, setCategorias] = useState([]);

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

  //-------
  // Por que precisa do colchete?
  const [usuario] = React.useContext(UserContext);

  return (
    <Layout>
      <div className="box despesa">
        <p className="title">Ver despesa</p>
        <p>Hello {usuario}</p>
        <form className="form-nova-despesa" onSubmit={function handleSubmit(info) {
          info.preventDefault();
          /*setDados([
            ...dados,
            values,
          ]);*/

          fetch(`${URL_BACKEND}/api/despesa`, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: values.id,
              data: dateSave(values.data),
              descricao: values.descricao,
              valor: saveFormat(values.valor),
              local: values.local,
              observacao: values.observacao,
              categoria_id: values.categoria_id === '' ? 0 : values.categoria_id
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
            label="Data"
            type="text"
            name="data"
            value={values.data}
            onChange={handleChange}
          />
          <FormField
            label="Descrição"
            type="text"
            name="descricao"
            value={values.descricao}
            onChange={handleChange}
          />
          <FormField
            label="Valor"
            type="text"
            name="valor"
            value={values.valor}
            onChange={handleChange}
          />
          <FormField
            label="Local"
            type="text"
            name="local"
            value={values.local}
            onChange={handleChange}
          />
          <FormField
            label="Observação"
            type="text"
            name="observacao"
            value={values.observacao}
            onChange={handleChange}
          />
          <FormSelect
            label="Categoria"
            name="categoria_id"
            value={String(values.categoria_id)}
            selectedValue={values.categoria_id}
            onChange={handleChange}
            options={categorias}
          />

          {/*<Autocomplete
            id="combo-box-demo"
            value={values.nome}
            options={categorias.map((categoria) => ( categoria.nome ))}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
          />*/}

          <div className="botoes">
            <Button type="submit" cor={'var(--green)'}>
              Salvar
            </Button>
            <Button as={Link} to="/" cor={'var(--orange)'}>
              Voltar
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Ver;
