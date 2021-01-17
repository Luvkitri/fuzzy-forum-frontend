import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { isLoggedIn, setLocalStorage } from '../../utils/auth';

// context
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
    Button,
    Avatar,
    Typography,
    Link,
    IconButton
} from '@material-ui/core';

// @material-ui styles
import {
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core/styles'

// @material-ui icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CloseIcon from '@material-ui/icons/Close'

// @material-ui labs
import { AppAlert } from '../../ts/interfaces/local_interfaces';
import { Alert } from '@material-ui/lab';


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
            margin: '20px auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        toolbar: theme.mixins.toolbar,
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

    // States
    const [alert, setAlert] = useState<AppAlert>({ active: false, type: 'error', msg: '' })

    // Context
    const { setUser } = useContext<UserContextType>(UserContext);

    // Form Hook
    const { register, handleSubmit } = useForm();

    const onSubmit = async (loginData: LoginData) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, loginData);
            const responseObj = res.data;

            if (!responseObj.auth) {
                console.log(responseObj.error);
            }

            setLocalStorage(responseObj);
            setUser(responseObj.user);
        } catch (error) {
            setAlert({ active: true, type: 'error', msg: error.response.data.error })
        }
    }

    if (isLoggedIn()) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <CssBaseline />
            <Header sideMenu={false} />
            <div className={classes.toolbar} />
            {alert.active &&
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setAlert({ active: false, type: 'error', msg: '' });
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    severity={alert.type}
                >
                    {alert.msg}
                </Alert>
            }
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
