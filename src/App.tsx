import React from 'react';

import { BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

import Routes from './routes/routes';

function App() {
  return (
      <div className="App">
        <header>
          <Navbar />
        </header>
        <main>
          <Routes></Routes>
        </main>
      </div>  
    
  );
}

export default App;
