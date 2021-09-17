import React from 'react';
import './App.css';

import { BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';

import Login from './pages/Login/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="App">

        <main>
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <Route path="/cadastro" component={Register} /> {/*Cria a rota cadastro e importa o componente register*/}
          </Switch>
        </main>
      </div>  
    </Router>
    
  );
}

export default App;
