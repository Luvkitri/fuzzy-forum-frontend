import React, { useCallback, useState, useEffect, useRef, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { getAuthAxios } from '../../utils/auth';

// interfaces
import { Answer } from '../../ts/interfaces/db_interfaces';

// context
import { UserContext } from '../../context/User';
import { EntryContext } from '../../context/Entries';
import { EntryContextType } from '../../ts/types/context_types';
import { UserContextType } from '../../ts/types/context_types';

// components
import CodeBlock from './CodeBlock';
import ScoreControl from './ScoreControl';

// @material-ui components
import {
    Button,
    Divider,
    CardHeader,
    TextField,
    Avatar,
    CardContent,
    Typography,
    Paper,
    Link
} from '@material-ui/core';

// @material-ui styles
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type Props = {
    entryId: number,
    answers: Answer[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: 10,
            marginBottom: 10,
            padding: 16
        },
        header: {
            flex: 1
        },
        form: {
            padding: 16
        },
        content: {
            margin: 10
        },
        text: {
            whiteSpace: 'pre-wrap',
        },
    })
)

const Answers: React.FC<Props> = ({ entryId, answers }) => {
    const classes = useStyles();

    // Context
    const { user } = useContext<UserContextType>(UserContext);
    const { entryRefreshKey, setEntryRefreshKey, setAlert } = useContext<EntryContextType>(EntryContext);

    // States
    const [answerContent, setAnswerContent] = useState<string>('');
    const [isSending, setIsSending] = useState<boolean>(false);
    
    const isMounted = useRef(true);

    const isAnswerFilled = answerContent.length !== 0;

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    const addAnswer = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isSending) {
            return;
        }

        if (user === null || user === undefined) {
            setAlert({ active: true, type: 'error', msg: 'User is not logged in' });
            window.scrollTo(0, 0);
            return;
        }

        setIsSending(true);

        try {
            const answerObj = {
                content: answerContent,
                user_id: user.id,
                entry_id: entryId
            }

            console.log(answerObj);

            const authAxios = getAuthAxios();
            const res = await authAxios.post(`${process.env.REACT_APP_API_URL}/answers/add`, answerObj)
            const responseObj = res.data;

            if (!responseObj.success) {
                console.log(responseObj.error);
            }

            setEntryRefreshKey(entryRefreshKey + 1);
            setAnswerContent('');
            setIsSending(false);

        } catch (error) {
            console.log(error);
        }
    }, [answerContent, entryId, isSending, user, entryRefreshKey, setAlert, setEntryRefreshKey]);

    return (
        <Paper className={classes.root}>
            {answers.length > 0 &&
                <Typography variant="h5" style={{ padding: 16 }} >{answers.length} Answers</Typography>
            }
            {answers.sort((a, b) => { return b.score - a.score }).map(answer => {
                const posted_at: Date = new Date(Date.parse(answer.posted_at));

                return (
                    <div key={answer.id}>
                        <CardHeader
                            className={classes.header}
                            subheader={`${posted_at.toLocaleDateString()} at ${posted_at.toLocaleTimeString().slice(0, -3)}`}
                            title={`${answer.User.first_name} ${answer.User.last_name}`}
                            avatar={
                                <Avatar aria-label="recipe">
                                    {answer.User.first_name.charAt(0)}
                                </Avatar>
                            }
                            action={
                                <ScoreControl type={"answer"} id={answer.id} score={answer.score} />
                            }
                        />
                        <CardContent>
                            <ReactMarkdown className={classes.content} children={answer.content} renderers={{
                                code: CodeBlock,
                                paragraph: ({ children }) => (
                                    <Typography className={classes.text} variant="body1">
                                        {children}
                                    </Typography>
                                ),
                            }} />
                        </CardContent>
                        <Divider light />
                    </div>
                )
            })}
            <Typography variant="h5" style={{ padding: 16, marginTop: 10 }} >Your Answer</Typography>
            <form className={classes.form} onSubmit={e => addAnswer(e)}>
                <TextField
                    id="content"
                    label="Answer"
                    placeholder="Your answer..."
                    fullWidth
                    multiline
                    rows={10}
                    rowsMax={100}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={answerContent}
                    onChange={e => setAnswerContent(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    style={{
                        marginBottom: 8
                    }}
                    variant="contained"
                    color="primary"
                    disabled={!isAnswerFilled}
                >
                    Add Answer
                </Button>
                <Typography color="textSecondary" variant="caption">
                    *Fuzzy-Forum supports markdown for more information visit: <Link color="inherit" href="https://commonmark.org/help/" >
                        https://commonmark.org/help/
                    </Link>
                </Typography>
            </form>
        </Paper>
    )
}

export default Answers;
