import React, { useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { isLoggedIn, logout } from '../../utils/auth';

// types
import { UserContextType } from '../../ts/types/context_types';

// context
import { UserContext } from '../../context/User';

// @material-ui components
import {
    Typography,
    Button,
    Avatar
} from '@material-ui/core';

// @material-ui icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';



const Controls: React.FC = () => {
    const history = useHistory();
    const { user, setUser } = useContext<UserContextType>(UserContext);

    if (isLoggedIn()) {
        return (
            <React.Fragment>
                <Button color="inherit" onClick={() => {
                    console.log(user);
                }}>
                    {user && user.login}
                </Button>
                <Button color="inherit" onClick={() => {
                    logout();
                    setUser(null);
                }}>
                    <ExitToAppIcon />
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
