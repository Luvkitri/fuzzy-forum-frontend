import React from 'react';
import { useHistory } from 'react-router-dom';
import { isLoggedIn } from '../../utils/auth';

// @material-ui components
import {
    Typography,
    Button,
    Avatar
} from '@material-ui/core';

const Controls = () => {
    const history = useHistory();

    // TODO
    if (isLoggedIn()) {
        return (
            <React.Fragment>
                <Button color="inherit" onClick={() => {
                    console.log('user info');
                }}>
                    USER_NAME
                </Button>
                <Button color="inherit" onClick={() => {
                    console.log('logout');
                }}>
                    Logout
                </Button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <Button color="inherit" onClick={() => { history.push("/users/login") }}>Login</Button>
                <Button color="inherit" onClick={() => { history.push("/users/signup") }}>Sign up</Button>
            </React.Fragment>
        )
    }

}

export default Controls;
