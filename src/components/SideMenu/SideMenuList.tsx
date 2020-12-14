import React from 'react'

import { Thread } from '../../ts/interfaces/db_interfaces';

// Components
import SideMenuThread from './SideMenuThread';

// @material-ui components
import {
    List,
    Divider,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core'

// @material-ui styles
import {
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core/styles'

// @material-ui icons
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'

type Props = {
    threads: Thread[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            padding: '10px 15px 0px',
            minHeight: '64px'
        },
        title: {
            flexGrow: 1,
        },
    })
)

const SideMenuList: React.FC<Props> = ({ threads }) => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.toolbar}> 
                <Typography className={classes.title}>Fuzzy Forum</Typography>
                <Typography>v 0.0.1</Typography>
            </div>
            <Divider />
            <List>
                {threads.map((thread) => (
                    <SideMenuThread key={thread.id} name={thread.name} subThreads={thread.SubThreads} />
                ))}
            </List>
        </div>
    );
}

export default SideMenuList;
