import React from 'react';
import Home from './pages/Home';
import './App.css';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home}/>
    </Switch>
  );
}

export default App;
