import React from 'react';

import { BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import RecuperarSenha from './pages/RecuperarSenha/RecuperarSenha';

function App() {
  return (
    <Router>
      <div className="App">

        <main>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/cadastro" component={Register} /> {/*Cria a rota cadastro e importa o componente register*/}
            <Route path="/recuperar-senha" exact component={RecuperarSenha} />
          </Switch>
        </main>
      </div>  
    </Router>
    
  );
}

export default App;
