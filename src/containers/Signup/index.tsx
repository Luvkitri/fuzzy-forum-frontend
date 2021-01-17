import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { isLoggedIn } from '../../utils/auth';

// components
import Header from '../../components/Header';

// @material-ui components
import {
    CssBaseline,
    Paper,
    TextField,
    Button,
    Avatar,
    Typography,
} from '@material-ui/core';

// @material-ui styles
import {
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core/styles'

// @material-ui icons
import Face from '@material-ui/icons/Face';

type RegisterData = {
    firstName: string,
    lastName: string,
    login: string,
    email: string,
    password: string,
    confirmPassword: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 500,
            minWidth: 400,
            minHeight: 300,
            maxHeight: 1000,
            marginTop: theme.spacing(14),
            padding: 20,
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

const SignupPage: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();

    // Hook Form
    const { register, handleSubmit, errors, watch } = useForm();

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = async (registerData: RegisterData) => {
        try {
            const res = await axios.post('http://localhost:5000/users/signup', registerData);
            const responseObj = res.data;

            history.push('/users/login');
        } catch (error) {
            console.log(error.response.data.errors);
        }
    }

    if (isLoggedIn()) {
        history.goBack();
    }

    return (
        <div>
            <CssBaseline />
            <Header sideMenu={false} />
            <Paper className={classes.root} elevation={5}>
                <Avatar className={classes.avatar}>
                    <Face />
                </Avatar>
                <Typography variant="h5" component="h2">
                    Sign Up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        name="firstName"
                        inputRef={register({
                            required: true,
                            minLength: 2,
                            maxLength: 50
                        })}
                        id="firstName"
                        label="First Name"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoComplete="given-name"
                        autoFocus
                        helperText={errors.firstName && "First name must be between 2 and 50 letters"}
                        error={errors.firstName ? true : false}
                    />
                    <TextField
                        name="lastName"
                        inputRef={register({
                            required: true,
                            minLength: 2,
                            maxLength: 50
                        })}
                        id="lastName"
                        label="Last Name"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoComplete="family-name"
                        helperText={errors.lastName && "Last name must be between 2 and 50 letters"}
                        error={errors.lastName ? true : false}
                    />
                    <TextField
                        name="login"
                        inputRef={register({
                            required: false,
                            minLength: 3,
                            maxLength: 100
                        })}
                        id="login"
                        label="Login"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        autoComplete="username"
                        helperText={errors.login && "Last name must be between 3 and 100 letters"}
                        error={errors.login ? true : false}
                    />
                    <TextField
                        name="email"
                        inputRef={register({
                            required: true,
                            minLength: 3,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        })}
                        id="email"
                        label="Email Address"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoComplete="email"
                        helperText={errors.email && "Input correct email."}
                        error={errors.email ? true : false}
                    />
                    <TextField
                        name="password"
                        inputRef={register({
                            required: true,
                            minLength: 6,
                            maxLength: 50
                        })}
                        label="Password"
                        type="password"
                        id="password"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoComplete="new-password"
                        helperText={errors.password && "Input correct password. At least 6 characters."}
                        error={errors.password ? true : false}
                    />
                    <TextField
                        name="confirmPassword"
                        inputRef={register({
                            required: true,
                            minLength: 6,
                            maxLength: 50,
                            validate: value => value === password.current
                        })}
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoComplete="new-password"
                        helperText={errors.confirmPassword && "Passwords do not match"}
                        error={errors.confirmPassword ? true : false}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign up
                    </Button>
                </form>
            </Paper>
        </div>
    );
}

export default SignupPage;
