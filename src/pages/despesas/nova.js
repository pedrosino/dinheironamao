import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import FormField from '../../components/FormField';
import FormSelect from '../../components/FormSelect';
import { getCurrentDate, dateSave } from '../../utils/date';
import { saveFormat } from '../../utils/money';
//import TextField from '@material-ui/core/TextField';
//import Autocomplete from '@material-ui/lab/Autocomplete';
import './despesa.css';

function Nova() {
  const history = useHistory({forceRefresh: true});
  const initialValues = {
    data: getCurrentDate("/"),
    descricao: '',
    valor: '',
    local: '',
    observacao: '',
    categoria_id: 0
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

  // Busca categorias
  const [categorias, setCategorias] = useState([]);

  const URL_BACKEND = window.location.hostname.includes('localhost')
  ? 'http://localhost:3001'
  : 'https://pedromoney.herokuapp.com';

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

  return(
    <Layout>
      <div className="box despesa">
        <p className="title">Nova despesa</p>
        <form className="form-nova-despesa" onSubmit={function handleSubmit(info) {
          info.preventDefault();
          /*setDados([
            ...dados,
            values,
          ]);*/

          // make post request with the data
          fetch(`${URL_BACKEND}/api/despesa`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              data: dateSave(values.data),
              descricao: values.descricao,
              valor: saveFormat(values.valor),
              local: values.local,
              observacao: values.observacao,
              categoria_id: values.categoria_id
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
            value={values.categoria_id}
            selectedValue={values.categoria_id}
            onChange={handleChange}
            options={categorias}
          />

          {/*<Autocomplete
            id="combo-box-demo"
            options={categorias.map((categoria) => ( categoria.nome ))}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
          />*/}

          <div className="botoes">
            <Button type="submit">
              Salvar
            </Button>
            <Button as={Link} to="/" cor={'var(--orange)'}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Nova;
