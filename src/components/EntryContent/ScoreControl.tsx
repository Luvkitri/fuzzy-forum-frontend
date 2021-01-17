import React, { useContext } from 'react';
import { getAuthAxios } from '../../utils/auth';

// types
import { EntryContextType, UserContextType } from '../../ts/types/context_types';

// context
import { UserContext } from '../../context/User';
import { EntryContext } from '../../context/Entries'

// @material-ui styles
import { makeStyles, createStyles } from '@material-ui/core/styles';

// @material-ui components
import { Typography, Box, IconButton } from '@material-ui/core';

// @material-ui icons
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


type Props = {
    type: string,
    id: number,
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
            padding: 10,
        },
    }),
);

const ScoreControl: React.FC<Props> = ({ type, id, score }) => {
    const classes = useStyles();

    // Context
    const { user } = useContext<UserContextType>(UserContext);
    const { setAlert, entryRefreshKey, setEntryRefreshKey } = useContext<EntryContextType>(EntryContext);

    const changeScore = async (option: string) => {
        try {
            if (user === null || user === undefined) {
                setAlert({ active: true, type: 'error', msg: 'You need to be logged in to rate others' });
                window.scrollTo(0, 0);
                return;
            }

            const scoreObj = {
                score: option
            }

            const authAxios = getAuthAxios();

            switch (type) {
                case "entry":
                    await authAxios.post(`${process.env.REACT_APP_API_URL}/entries/${id}/score`, scoreObj);
                    break;
                case "answer":
                    await authAxios.post(`${process.env.REACT_APP_API_URL}/answers/${id}/score`, scoreObj);
                    break;
                default:
                    console.log("Wrong type");
                    return;
            }

            setEntryRefreshKey(entryRefreshKey + 1);
        } catch (error) {
            setAlert({ active: true, type: 'error', msg: error.response.data.error });
            window.scrollTo(0, 0);
        }
    };

    return (
        <div>
            <Box display="flex" className={classes.root}>
                <Box display="inline" >
                    <IconButton size="small" disableRipple className={classes.button} onClick={() => changeScore('increment')}>
                        <AddIcon />
                    </IconButton>
                    <IconButton size="small" disableRipple className={classes.button} onClick={() => changeScore('decrement')}>
                        <RemoveIcon />
                    </IconButton>
                </Box>
                <Box display="inline" className={classes.scoreContainer}>
                    <Typography variant="subtitle1" className={classes.score}>{score}</Typography>
                </Box>
            </Box>
        </div>

    )
}

export default ScoreControl;
