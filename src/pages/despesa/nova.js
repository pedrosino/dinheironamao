import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import FormField from '../../components/FormField';
import FormSelect from '../../components/FormSelect';
import { getCurrentDate, dateSave } from '../../utils/date';
//import TextField from '@material-ui/core/TextField';
//import Autocomplete from '@material-ui/lab/Autocomplete';

function Nova() {
  const history = useHistory();
  const initialValues = {
    data: getCurrentDate("/"),
    descricao: '',
    valor: '',
    local: '',
    observacao: '',
    categoria: ''
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

  function getCategorias() {
    return fetch(`${URL_BACKEND}/categorias`)
      .then(async (serverResponse) => {
        if (serverResponse.ok) {
          const response = await serverResponse.json();
          return response;
        }
        throw new Error('Não foi possível obter os dados');
      });
  }

  useEffect(() => {      
    getCategorias()
      .then((todas) => {
        setCategorias(todas);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

        fetch(`${URL_BACKEND}/despesa`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: dateSave(values.data),
            descricao: values.descricao,
            valor: values.valor,
            local: values.local,
            observacao: values.observacao,
            categoria_id: values.categoria === '' ? 0 : values.categoria
          })
        })
          .then(response => response.json())
          .then(item => {
            console.log("item ", item);
            /*if(Array.isArray(item)) {
              this.props.addItemToState(item[0])
              this.props.toggle()
            } else {
              console.log('failure')
            }*/
          })
          .catch(err => console.log(err))

        clearForm();
        history.push('/');
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
            name="categoria"
            value={values.categoria}
            selectedValue={values.categoria}
            onChange={handleChange}
            options={categorias}
          />

          {/*<Autocomplete
            id="combo-box-demo"
            options={categorias.map((categoria) => ( categoria.nome ))}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
          />*/}

          <Button type="submit">
            Salvar
          </Button>
          <Button as={Link} to="/" cor={'var(--orange)'}>
            Cancelar
          </Button>
        </form>
      </div>
    </Layout>
  );
}

export default Nova;
