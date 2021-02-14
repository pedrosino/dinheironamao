import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
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
import { UserContext } from './context.js';

function App() {
  const [usuario, setUsuario] = useState(localStorage.getItem('userid') || 0);

  return (
    

    <UserContext.Provider value={[usuario, setUsuario]}>
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
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
