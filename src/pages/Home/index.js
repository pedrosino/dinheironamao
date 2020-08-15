import React from 'react';
import Layout from '../../components/Layout';

function Home() {
  return(
    <Layout>
      <div className="box">
      <div class="box-saldo">
          <p class="title">Agosto/2020</p>
          <p class="gasto">Total gasto: R$ 1.200,00</p>
          <p class="saldo">Saldo do mês: R$ 2.800,00</p>
        </div>
        <div class="ultimas">
          <p class="title">Últimas despesas</p>
          <table class="tabela-ultimas">
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Valor</th>
            </tr>
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
          </table>
        </div>
      </div>
      <div className="box">
        <p class="title">Linha do tempo</p>
        <img src="line.png" alt="line" />
      </div>
      <div className="box">
        <p class="title">Categorias</p>
      </div>
    </Layout>
  );
}

export default Home;
