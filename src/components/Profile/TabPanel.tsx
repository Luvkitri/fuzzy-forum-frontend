import React, { useContext } from 'react'
import { Redirect, useParams } from 'react-router-dom';

// components
import UserProfile from './UserProfile';
import UserEntries from './UserEntries';
import UserAnswers from './UserAnswers';

// context
import { UserContext } from '../../context/User';
import { UserContextType } from '../../ts/types/context_types';

// @material-ui components
import {
    List,
    ListItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';

// @material-ui styles
import {
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core/styles'

type Props = {
    index: number,
    value: number,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: 10,
            flexGrow: 1,
            width: '100%',
        },
        paper: {
            backgroundColor: 'grey'
        },
        profile: {
            padding: 25
        },
        label: {
            padding: theme.spacing(1),
        },
    })
)

const TabPanel: React.FC<Props> = ({ index, value, ...other }) => {
    const classes = useStyles();

    // Context
    const { user } = useContext<UserContextType>(UserContext);

    const selectView = (index: number) => {

        switch (index) {
            case 0:
                if (user === null) {
                    break;
                }

                return <UserProfile user={user} />
            case 1:
                return <UserEntries />
            case 2:
                return <UserAnswers />
        }
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            className={classes.root}
        >
            {value === index && selectView(index)}
        </div>
    )
}

export default TabPanel;
