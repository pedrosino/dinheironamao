import React from 'react';
import Layout from '../../components/Layout';

function Home() {
  return(
    <Layout>
      <div className="box">
      <div className="box-saldo">
          <p className="title">Agosto/2020</p>
          <p className="gasto">Total gasto: R$ 1.200,00</p>
          <p className="saldo">Saldo do mês: R$ 2.800,00</p>
        </div>
        <div className="ultimas">
          <p className="title">Últimas despesas</p>
          <table className="tabela-ultimas">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>02/08</td>
                <td>Supermercado</td>
                <td>R$ 52,67</td>
              </tr>
              <tr>
                <td>04/08</td>
                <td>Aluguel</td>
                <td>R$ 620,00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="box">
        <p className="title">Linha do tempo</p>
        <img src="line.png" alt="line" />
      </div>
      <div className="box">
        <p className="title">Categorias</p>
      </div>
    </Layout>
  );
}

export default Home;
