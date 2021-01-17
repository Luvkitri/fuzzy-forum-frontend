import React from 'react'

// interfaces
import { Thread } from '../../ts/interfaces/db_interfaces';

// components
import SideMenuList from './SideMenuList';

// @materil-ui components
import {
    Hidden,
    Drawer,
} from '@material-ui/core'

// @material-ui styles
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';


type Props = {
    threads: Thread[],
    mobileOpen: boolean,
    handleDrawerToggle(): void
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

const SideMenu: React.FC<Props> = ({ threads, mobileOpen, handleDrawerToggle }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden mdUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <SideMenuList threads={threads} />
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    <SideMenuList threads={threads} />
                </Drawer>
            </Hidden>
        </nav>
    )
}

export default SideMenu;
