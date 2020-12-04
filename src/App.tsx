import React, { useState, useEffect } from 'react';

// containers
import Home from './containers/Home'

// components
import Header from './components/Header';

// @material-ui
import CssBaseline from '@material-ui/core/CssBaseline';

const App: React.FC = () => {
    return (
        <div className="App">
            <CssBaseline />
            <Header />
            <Home />
        </div>
    );
}

export default App;
