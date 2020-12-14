import React from 'react'

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
    Container,
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
import Face from '@material-ui/icons/Face';
import Fingerprint from '@material-ui/icons/Fingerprint';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
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
