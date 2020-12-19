import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

// interfaces
import { Thread } from '../../ts/interfaces/db_interfaces'

// components
import SideMenu from '../SideMenu';
import Controls from './Controls';

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
import { isLoggedIn } from '../../utils/auth';


type Props = {
    sideMenu: boolean
}

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
        link: {
            textDecoration: 'none',
            color: 'white'
        },
    }),
);

const Header: React.FC<Props> = ({ sideMenu }) => {
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

    if (isLoggedIn()) {

    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.navBar}>
                <Toolbar>
                    {sideMenu &&
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                    }
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" className={classes.link}>Fuzzy-Forum</Link>
                    </Typography>
                    <Controls />
                </Toolbar>
            </AppBar>
            {sideMenu && <SideMenu threads={threads} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />}
        </div>
    )
}

export default Header;
