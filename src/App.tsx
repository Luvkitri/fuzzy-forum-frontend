import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// containers
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';

// components
import Header from './components/Header';

// @material-ui
import CssBaseline from '@material-ui/core/CssBaseline';

const App: React.FC = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/users/login" exact component={Login}/>
                    <Route path="/users/signup" exact component={Signup} />
                    <Route path="/" render={() => <div><h1>404</h1></div>} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
