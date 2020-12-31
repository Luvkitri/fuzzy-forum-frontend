import React from 'react'

// @material-ui styles
import { makeStyles, createStyles } from '@material-ui/core/styles';

// @material-ui components
import { Button, Typography, Box, IconButton } from '@material-ui/core';

// @material-ui icons
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

type Props = {
    score: number
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {

        },
        scoreContainer: {
            marginTop: 28,
        },
        score: {
            fontSize: 18,
        },
        button: {
            display: "block",
            padding: 10
        },
    }),
);

const ScoreControl: React.FC<Props> = ({ score }) => {
    const classes = useStyles();

    return (
        <Box display="flex" className={classes.root}>
            <Box display="inline" >
                <IconButton size="small" className={classes.button}><AddIcon /></IconButton>
                <IconButton size="small" className={classes.button}><RemoveIcon /></IconButton>
            </Box>
            <Box display="inline" className={classes.scoreContainer}>
                <Typography variant="subtitle1" className={classes.score}>{score}</Typography>
            </Box>
        </Box>
    )
}

export default ScoreControl;
