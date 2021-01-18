import React from 'react';
import { useHistory } from 'react-router-dom';

// Interfaces
import { Entry } from '../../ts/interfaces/db_interfaces';

// Components
import Counter from './Counter';
import Footer from './Footer';

// @material-ui
import {
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    makeStyles,
    Typography,
    Avatar
} from '@material-ui/core';

type Props = {
    entry: Entry
}

const useStyles = makeStyles({
    root: {
        minWidth: 300,
        margin: 10
    },
    header: {
        flex: 0.5
    },
    userName: {
        fontSize: 12
    },
    avatar: {

    },
    countersContainer: {
        textAlign: "center"
    },
    titleArea: {
        marginLeft: 10
    }
});

const EntryPreview: React.FC<Props> = ({ entry }) => {
    const classes = useStyles();
    const posted_at: Date = new Date(Date.parse(entry.posted_at));

    const history = useHistory();

    return (
        <Card className={classes.root}>
            <CardHeader
                className={classes.header}
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {entry.User.first_name.charAt(0)}
                    </Avatar>
                }
                title={`${entry.User.first_name} ${entry.User.last_name}`}
                action={
                    <React.Fragment>
                        <Counter name="Score" value={entry.score} />
                        <Counter name="Answers" value={entry.answers} />
                    </React.Fragment>
                }
                subheader={`${posted_at.toLocaleDateString()} at ${posted_at.toLocaleTimeString().slice(0, -3)}`}
            />
            <CardActionArea onClick={() => history.push(`/${entry.id}`)}>
                <CardContent className={classes.titleArea}>
                    <Typography variant="h6" component="h2">{entry.title}</Typography>
                </CardContent>
            </CardActionArea>
            <Footer thread={entry.Thread} tags={entry.TagsInEntries} />
        </Card>
    )
}

export default EntryPreview;
