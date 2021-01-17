import classes from '*.module.css';
import { createStyles, List, ListItem, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react'

// interfaces
import { LogedInUser } from '../../ts/interfaces/res_interfaces'

type Props = {
    user: LogedInUser
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: 25
        },
        label: {
            padding: theme.spacing(1),
        },
    })
);

const UserProfile: React.FC<Props> = ({ user }) => {
    const classes = useStyles();

    const created_at: Date = new Date(Date.parse(user.created_at));
    const updated_at: Date = new Date(Date.parse(user.updated_at))

    return (
        <List className={classes.root}  >
            <ListItem>
                <Typography variant="button" className={classes.label}>
                    First Name:
                </Typography>
                <Typography>
                    {user.first_name}
                </Typography>
            </ListItem>
            <ListItem>
                <Typography variant="button" className={classes.label}>
                    Last Name:
                            </Typography>
                <Typography>
                    {user.last_name}
                </Typography>
            </ListItem>
            <ListItem>
                <Typography variant="button" className={classes.label}>
                    Login:
                </Typography>
                <Typography>
                    {user.login}
                </Typography>
            </ListItem>
            <ListItem>
                <Typography variant="button" className={classes.label}>
                    Email:
                </Typography>
                <Typography>
                    {user.email}
                </Typography>
            </ListItem>
            <ListItem>
                <Typography variant="button" className={classes.label}>
                    Created At:
                </Typography>
                <Typography>
                    {created_at.toLocaleDateString()}
                </Typography>
            </ListItem>
            <ListItem>
                <Typography variant="button" className={classes.label}>
                    Updated At:
                </Typography>
                <Typography>
                    {updated_at.toLocaleDateString()}
                </Typography>
            </ListItem>
        </List>
    );
}

export default UserProfile
