import { useState } from 'react';

// custom hooks (?)
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  function setValue(key, value) {
    // key describes the field
    setValues({
      ...values,
      [key]: value, // transforma key em um nome de propriedade
    });
  }

  function handleChange(info) {
    // "extrai" valores de info.target
    const { name, value } = info.target;
    setValue(name, value);
  }

  function clearForm() {
    setValues(initialValues);
  }

  return {
    handleChange,
    values,
    clearForm,
  };
}

export default useForm;
