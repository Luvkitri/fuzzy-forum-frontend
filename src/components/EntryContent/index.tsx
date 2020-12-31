import React from 'react';
import ReactMarkdown from 'react-markdown'

// interfaces
import { WholeEntry } from '../../ts/interfaces/db_interfaces';

// components
import ScoreControl from './ScoreControl';
import Answers from './Answers';
import CodeBlock from './CodeBlock';
import Footer from '../Preview/Footer'

// @material-ui styles
import { 
    makeStyles,
    createStyles,
    Theme,
    createMuiTheme,
    ThemeProvider 
} from '@material-ui/core/styles';

// @material-ui components
import { 
    Card,
    CardHeader,
    Container, 
    Avatar,
    CardContent,
    Typography,
    Divider
} from '@material-ui/core';


type Props = {
    isLoading: boolean,
    entry: WholeEntry
}

const actionTheme = createMuiTheme({
    overrides: {
        MuiCardHeader: {
            root: {
                padding: 16,
                marginLeft: 10,
                paddingBottom: 0
            },
            action: {
                marginTop: 5,
                marginRight: 10,
                padding: 0
            },
            title: {
                marginTop: 0,
                padding: 0
            }
        }
    }
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 200,
            flexGrow: 1,
            marginTop: 10,
        },
        toolbar: theme.mixins.toolbar,
        card: {
            padding: 10
        },
        header: {
            flex: 1
        },
        userName: {
            fontSize: 12
        },
        avatar: {

        },
        title: {
            padding: 10
        },
        content: {
            margin: 10,
        }
    }),
);

const EntryContent: React.FC<Props> = ({ isLoading, entry }) => {
    const classes = useStyles();
    const posted_at: Date = new Date(Date.parse(entry.posted_at));

    if (isLoading) {
        return <div></div>
    }

    return (
        <Container className={classes.root}>
            <div className={classes.toolbar} />
            <Card className={classes.card}>
                <ThemeProvider theme={actionTheme}>
                    <CardHeader
                        className={classes.header}
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {entry.User.first_name.charAt(0)}
                            </Avatar>
                        }
                        title={`${entry.User.first_name} ${entry.User.last_name}`}
                        subheader={`${posted_at.toLocaleDateString()} at ${posted_at.toLocaleTimeString().slice(0, -3)}`}
                        action={
                            <ScoreControl score={entry.score} />
                        }
                    />
                </ThemeProvider>

                <CardContent>
                    <Typography variant="h4" className={classes.title}>
                        {entry.title}
                    </Typography>
                    <ReactMarkdown className={classes.content} children={entry.content} renderers={{
                        code: CodeBlock,
                        paragraph: ({ children }) => (
                            <Typography variant="body1">
                                {children}
                            </Typography>
                        ),
                    }} />
                </CardContent>
                <Divider light />
                <Footer thread={entry.Thread} tags={entry.TagsInEntries}/>
            </Card>
            <Answers entryId={entry.id} answers={entry.Answers} />
        </Container>
    )
}

export default EntryContent;
