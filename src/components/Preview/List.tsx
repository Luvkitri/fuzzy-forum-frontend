import React from 'react';

// Interfaces
import { Entry } from '../../ts/interfaces/db_interfaces';

// Compontents
import Preview from '.';

// @material-ui components
import { Container } from '@material-ui/core';

// @material-ui styles
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

type Props = {
    entries: Entry[],
    isLoading: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: theme.spacing(10),
        },
    }),
);

const List: React.FC<Props> = ({ isLoading, entries }) => {
    const classes = useStyles();

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                {entries.filter(entry => entry.active).map(entry => (
                    <Preview entry={entry} />
                ))}
            </Container>
        </div>
    );
}

export default List;
