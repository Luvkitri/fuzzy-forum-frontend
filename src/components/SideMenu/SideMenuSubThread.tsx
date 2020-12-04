import React from 'react'

// @material-ui components
import { ListItem, ListItemText } from '@material-ui/core';

// @material-ui styles
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';


type Props = {
    key: number,
    name: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        nested: {
            paddingLeft: theme.spacing(4),
        }
    }),
);

const SubThread: React.FC<Props> = ({ key, name }) => {
    const classes = useStyles();

    return (
        <div>
            <ListItem button className={classes.nested}>
                <ListItemText primary={name} />
            </ListItem>
        </div>
    );
}

export default SubThread;
