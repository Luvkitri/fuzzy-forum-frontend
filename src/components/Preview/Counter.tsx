import React from 'react'

// @material-ui components
import { Typography, Paper } from '@material-ui/core';

// @material-ui styles
import { makeStyles } from '@material-ui/core/styles'

type Props = {
    name: string,
    value: number
}

const useStyles = makeStyles({
    root: {
        textAlign: "center",
        display: "inline-block",
        padding: 5,
        margin: 10
    }
});

const Counter: React.FC<Props> = ({ name, value }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={0}>
            <Typography variant="subtitle1" component="h2">
                {value}
            </Typography>
            <Typography variant="body2" component="p">
                {name}
            </Typography>
        </Paper>
    );
}

export default Counter;
