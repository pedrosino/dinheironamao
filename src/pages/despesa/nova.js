import React from 'react';
import Layout from '../../components/Layout';
import Button from '../../components/Button';

function Nova() {
  return(
    <Layout>
      <div className="box">
        <p class="title">Nova despesa</p>
        <form className="form-nova-despesa">
          Data: <input type="text" name="data" />
          <Button type="submit">
            Salvar
          </Button>
        </form>
      </div>
    </Layout>
  );
}

export default Nova;
