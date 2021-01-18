import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { isLoggedIn, logout } from '../../utils/auth';

// context
import { UserContext } from '../../context/User';
import { UserContextType } from '../../ts/types/context_types';

// @material-ui components
import {
    Button
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
                    if (user) {
                        history.push(`/users/profile/${user.id}`)
                    }
                }}>
                    {user && user.login}
                </Button>
                <Button color="inherit" onClick={() => {
                    logout();
                    setUser(null);
                    history.push('/users/login');
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
