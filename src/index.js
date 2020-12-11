import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import About from '../src/pages/About';
import Home from '../src/pages/Home';
import NovaDespesa from '../src/pages/despesas/nova';
import VerDespesa from '../src/pages/despesas/ver';
import Despesas from '../src/pages/despesas/index';
import NovaCategoria from '../src/pages/categorias/nova';
import VerCategoria from '../src/pages/categorias/ver';
import Categorias from '../src/pages/categorias/index';
import Register from '../src/pages/users/register';
import Login from '../src/pages/users/login';
import { StateProvider } from './context.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StateProvider value={0}>
    <BrowserRouter>
      <Switch>
        {/*<Route path="/relatorio" component={Relatorio} />*/}
        <Route path="/despesas/nova" component={NovaDespesa} />
        <Route path="/despesas/:id" component={VerDespesa} />
        <Route path="/despesas" component={Despesas} />
        <Route path="/categorias/nova" component={NovaCategoria} />
        <Route path="/categorias/:id" component={VerCategoria} />
        <Route path="/categorias" component={Categorias} />
        <Route path="/users/register" component={Register} />
        <Route path="/users/login" component={Login} />
        <Route path="/about" component={About} />
        <Route path="/" component={Home} exact />
        <Route component={() => (<div>Não encontrado</div>)} />
      </Switch>
    </BrowserRouter>,
  </StateProvider>,
  
  //<React.StrictMode>
  //  <App />
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
