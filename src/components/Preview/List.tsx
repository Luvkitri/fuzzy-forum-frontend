import React from 'react';

// interfaces
import { Entry } from '../../ts/interfaces/db_interfaces';

// compontents
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
            [theme.breakpoints.up('md')]: {
                marginLeft: theme.spacing(30),
            },
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
            <Container maxWidth="xl">
                {entries.filter(entry => entry.active).map(entry => (
                    <Preview key={entry.id} entry={entry} />
                ))}
            </Container>
        </div>
    );
}

export default List;
