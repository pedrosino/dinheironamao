import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import FormField from '../../components/FormField';
import FormSelect from '../../components/FormSelect';
import getCurrentDate from '../../utils/date';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

  const options = [
    { value: '', label: '' },
    { value: 'alimentacao', label: 'Alimentação' },
    { value: 'mercado', label: 'Mercado' },
    { value: 'moradia', label: 'Moradia' },
  ];

  return(
    <Layout>
      <div className="box">
        <p className="title">Nova despesa</p>
        <form className="form-nova-despesa" onSubmit={function handleSubmit(info) {
        info.preventDefault();
        /*setDados([
          ...dados,
          values,
        ]);*/
        console.log(values);
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
            onChange={handleChange}
            options={options}
          />

          {/*<Autocomplete
            id="combo-box-demo"
            options={['Alimentação','Mercado', 'Moradia']}
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
