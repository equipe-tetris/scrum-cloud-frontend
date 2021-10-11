import React from 'react';

import { BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';
import Home from '../pages/Home/Home';

import Login from '../pages/Login/Login';
import RecuperarSenha from '../pages/RecuperarSenha/RecuperarSenha';
import Register from '../pages/Register/Register';
import RegisterDev from '../pages/RegisterDev/RegisterDev';
import TeamPage from '../pages/TeamPage/TeamPage';

const Routes = () => {
    return( 
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/cadastro" component={Register} /> {/*Cria a rota cadastro e importa o componente register*/}
                <Route path="/recuperar-senha" component={RecuperarSenha} />
                <Route path="/home/dashboard" component={Home} />
                <Route path="/time/:id" exact component={TeamPage} />
                <Route path="/cadastro-dev/:id" exact component={RegisterDev} />
            </Switch>
        </Router>
    )
}

export default Routes;