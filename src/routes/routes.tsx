import React from 'react';

import { BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';
import Home from '../pages/Home/Home';

import Login from '../pages/Login/Login';
import RecuperarSenha from '../pages/RecuperarSenha/RecuperarSenha';
import Register from '../pages/Register/Register';

const Routes = () => {
    return( 
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/cadastro" component={Register} /> {/*Cria a rota cadastro e importa o componente register*/}
                <Route path="/recuperar-senha" component={RecuperarSenha} />
                <Route path="/home" component={Home} />
            </Switch>
        </Router>
    )
}

export default Routes;