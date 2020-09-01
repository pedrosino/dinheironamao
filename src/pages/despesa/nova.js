import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import FormField from '../../components/FormField';
import useForm from '../../hooks/useForm';
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

  const { handleChange, values, clearForm } = useForm(initialValues);

  /*const [dados, setDados] = useState([]);*/

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
          <FormField
            label="Categoria"
            type="select"
            name="categoria"
            value={values.categoria}
            onChange={handleChange}
            as="select"
            options={['Alimentação', 'Mercado', 'Moradia']}
          />
          <Autocomplete
            id="combo-box-demo"
            options={['Alimentação','Mercado', 'Moradia']}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
          />
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
