import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { isLoggedIn, setLocalStorage } from '../../utils/auth';
import { UserContext } from '../../context/User';
import { UserContextType } from '../../ts/types/context_types';

// components
import Header from '../../components/Header';

// @material-ui components
import {
    CssBaseline,
    Paper,
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Avatar,
    Typography,
    Link
} from '@material-ui/core';

// @material-ui styles
import {
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core/styles'

// @material-ui icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


type LoginData = {
    email: string,
    password: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 500,
            minWidth: 400,
            marginTop: theme.spacing(14),
            padding: 20,
            height: '70vh',
            margin: '20px auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            width: theme.spacing(5),
            height: theme.spacing(5),
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    })
)

const LoginPage: React.FC = () => {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();
    const { setUser } = useContext<UserContextType>(UserContext);

    const onSubmit = async (loginData: LoginData) => {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, loginData);
        const responseObj = res.data;

        if (!responseObj.auth) {
            console.log(responseObj.error);
        }

        setLocalStorage(responseObj);
        setUser(responseObj.user);
    }

    if (isLoggedIn()) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <CssBaseline />
            <Header sideMenu={false} />
            <Paper className={classes.root} elevation={5}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" component="h2">
                    Log In
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        name="email"
                        inputRef={register({
                            required: true
                        })}
                        label="Email Address"
                        id="email"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({
                            required: true
                        })}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/users/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
}

export default LoginPage;
