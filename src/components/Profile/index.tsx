import React, { useContext, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';

// context
import { UserContext } from '../../context/User';
import { UserContextType } from '../../ts/types/context_types';

// components
import TabPanel from './TabPanel';

// @material-ui components
import {
    Paper,
    Avatar,
    AppBar,
    Tabs,
    Tab,
    Box,
    Typography
} from '@material-ui/core';

// @material-ui styles
import {
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 800,
            minWidth: 400,
            marginTop: theme.spacing(14),
            height: '70vh',
            margin: '20px auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        topBar: {
            width: '100%',
            padding: 20,
            paddingBottom: 60,
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
        },
        avatar: {
            width: theme.spacing(10),
            height: theme.spacing(10),
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
            fontSize: 25,
            alignSelf: 'center',
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        username: {
            color: 'white',
        },
        paper: {
            backgroundColor: 'grey'
        },
        tabBar: {
            backgroundColor: 'black'
        }
    })
);

const Profile: React.FC = () => {
    const classes = useStyles();
    const params = useParams<{ userId: string | undefined }>();

    // Context
    const { user } = useContext<UserContextType>(UserContext);

    // States
    const [currentTab, setCurrentTab] = useState<number>(0);

    if (user === null || user === undefined || user.id.toString() !== params.userId) {
        return <Redirect to="/" />
    }

    const handleChange = (event: React.ChangeEvent<{}>, newTab: number) => {
        setCurrentTab(newTab);
    };

    const a11yProps = (index: any) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <Paper className={classes.root} elevation={5}>
            <Box justifyContent="center" className={classes.topBar}>
                <Avatar aria-label="recipe" className={classes.avatar}>
                    {user && user.first_name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography align="center" className={classes.username} variant="h6">
                    {user && `${user.first_name.toUpperCase()} ${user.last_name.toUpperCase()}`}
                </Typography>
            </Box>
            <AppBar className={classes.tabBar} position="static" elevation={0}>
                <Tabs value={currentTab} onChange={handleChange} variant="fullWidth" aria-label="simple tabs example">
                    <Tab label="Your Profile" {...a11yProps(0)} />
                    <Tab label="Your Entries" {...a11yProps(1)} />
                    <Tab label="Your Answers" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={currentTab} index={0}>
                Itemo Zero
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={currentTab} index={2}>
                Item Three
            </TabPanel>
        </Paper>
    )
}

export default Profile;
