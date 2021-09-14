import React from 'react';
import './App.css';

import { BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';

import Login from './pages/Login/Login';

function App() {
  return (
    <Router>
      <div className="App">

        <main>
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
          </Switch>
        </main>
      </div>  
    </Router>
    
  );
}

export default App;
