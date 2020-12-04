import React, { useEffect, useState } from 'react';
import axios from 'axios';

// interfaces
import { Thread } from '../../ts/interfaces/db_interfaces'

// components
import SideMenu from '../SideMenu';

// @material-ui components
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton
} from '@material-ui/core';

// @material-ui styles
import {
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core/styles'

// @material-ui icons
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        navBar: {
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: 'black',
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        title: {
            flexGrow: 1,
        },
    }),
);

const Header: React.FC = () => {
    const classes = useStyles();

    const [threads, setThreads] = useState<Thread[]>([]);
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    useEffect(() => {
        const fetchItems = async () => {
            const threadsRequest = axios.get('http://localhost:5000/threads');

            try {
                const [threads] = await axios.all([threadsRequest]);

                setThreads(threads.data);
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchItems();
    }, []);

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.navBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Fuzzy-Forum
                    </Typography>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Sign up</Button>
                </Toolbar>
            </AppBar>
            <SideMenu threads={threads} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        </div>
    )
}

export default Header;
