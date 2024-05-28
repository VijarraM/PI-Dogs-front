// src/Routes.js

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import DogDetailPage from './components/DogDetailPage';
import DogCreatePage from './components/DogCreatePage';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={LandingPage} />
        <Route path='/home' exact component={HomePage} />
        <Route path='/dogs/:id' exact component={DogDetailPage} />
        <Route path='/create' exact component={DogCreatePage} />
        {/* Agrega más rutas según sea necesario */}
      </Switch>
    </Router>
  );
};

export default Routes;
