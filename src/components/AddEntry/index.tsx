import React, { useState, useContext } from 'react';


import { authAxios } from '../../utils/auth';

// interfaces
import { Thread, Tag } from '../../ts/interfaces/db_interfaces';
import { AppAlert } from '../../ts/interfaces/local_interfaces';

// context
import { UserContext } from '../../context/User';
import { EntriesContext } from '../../context/Entries';
import { EntriesContextType, UserContextType } from '../../ts/types/context_types';

// @material-ui components
import {
    Button,
    FormControl,
    Select,
    TextField,
    MenuItem,
    InputLabel,
    Typography,
    Chip,
    Container,
    Box,
    Link
} from '@material-ui/core';

// @material-ui styles
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// @material-ui lab
import { Autocomplete, Alert } from '@material-ui/lab/';


type Props = {
    threads: Thread[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: 'white',
            maxWidth: 1000,
            minWidth: 400,
            minHeight: 300,
            marginTop: theme.spacing(10),
            padding: 0,
            height: 'auto',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 5,
        },
        toolbar: theme.mixins.toolbar,
        form: {
            width: '100%',
            height: '100%',
            padding: 10,
            margin: theme.spacing(-4, 1, 1, -1),
        },
        submit: {
            margin: 8,
        },
        formControl: {
            margin: 8,
            minWidth: 150,
        },
        header: {
            margin: 8,
            marginTop: -5,
            textAlign: 'center',
        },
        chip: {
            margin: 8,
        },
        chipContainer: {
            width: '100%',
            padding: 0,
        },
        caption: {
            padding: 8
        }
    }),
);

const AddEntry: React.FC<Props> = ({ threads }) => {
    const classes = useStyles();

    // Context
    const { user } = useContext<UserContextType>(UserContext)
    const { entriesRefreshKey, setEntriesRefreshKey } = useContext<EntriesContextType>(EntriesContext);

    // Form content states
    const [thread, setThread] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

    const [tags, setTags] = useState<Tag[]>([]);
    const [currentWrittenTag, setCurrentWrittenTag] = useState<string | null>('');
    const [selectError, setSelectError] = useState<boolean>(true);
    const [alert, setAlert] = useState<AppAlert>({ active: false, type: 'error', msg: '' })

    if (alert.active) {
        return <Alert severity={alert.type}>{alert.msg}</Alert>;
    }

    const isTagPicked = selectedTags.length !== 0;
    const isAllFilled = isTagPicked && thread && title && content;

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (user === null || user === undefined) {
            setAlert({ active: true, type: 'error', msg: 'User is not loggedin' });
            return;
        }

        const entryData = {
            title: title,
            content: content,
            user_id: user.id,
            thread_id: threads.filter(value => value.name === thread)[0].id,
            entryTags: selectedTags
        }

        const res = await authAxios.post(`${process.env.REACT_APP_API_URL}/entries/add`, entryData);
        const responseObj = res.data;

        if (responseObj.success === false) {
            setAlert({ active: true, type: 'error', msg: 'Could not add new entry' });
            return;
        }

        setAlert({ active: true, type: 'success', msg: 'Entry added' });
        setEntriesRefreshKey(entriesRefreshKey + 1);
    }

    const handleThreadChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        let selectedValue = event.target.value as string;

        if (selectedValue === '' && selectError === false) {
            setSelectError(true);
        } else {
            setSelectError(false);

            const selectedThread = threads.filter(thread => thread.name === selectedValue)[0];
            setTags(selectedThread.SubThreads);
        }

        setSelectedTags([]);
        setThread(selectedValue);
    }

    const addTag = () => {
        if (currentWrittenTag !== null) {
            selectedTags.push(currentWrittenTag);
            setSelectedTags([...selectedTags]);
            setCurrentWrittenTag('');
        }
    }

    const removeTag = (tag: string) => () => {
        setSelectedTags(selectedTags.filter(element => element !== tag));
    }

    return (
        <div className={classes.root}>
            <div className={classes.toolbar} />
            <form className={classes.form} onSubmit={onSubmit}>
                <Typography id="modal-title" variant="h4" component="h2" className={classes.header}>
                    Add Entry
                </Typography>
                <TextField
                    id="title"
                    label="Entry Title"
                    style={{ margin: 8 }}
                    placeholder="Title..."
                    fullWidth
                    multiline
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <TextField
                    id="content"
                    label="Entry Content"
                    style={{ margin: 8 }}
                    placeholder="Content..."
                    fullWidth
                    multiline
                    rows={15}
                    rowsMax={100}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <Container className={classes.chipContainer}>
                    {thread !== '' &&
                        <Chip
                            label={thread}
                            color="secondary"
                            className={classes.chip}
                        />
                    }
                    {selectedTags.map((tag) => (
                        <Chip
                            label={tag}
                            onDelete={removeTag(tag)}
                            color="primary"
                            className={classes.chip}
                        />
                    ))}
                </Container>
                <Box display="flex">
                    <FormControl variant="outlined" className={classes.formControl} error={selectError}>
                        <InputLabel id="thread-select-label">Pick a Thread</InputLabel>
                        <Select
                            labelId="thread-select-label"
                            id="thread-select"
                            value={thread}
                            onChange={handleThreadChange}
                            autoWidth
                            label="Pick a Thread"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {threads.map(thread => (
                                <MenuItem value={thread.name}>{thread.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Autocomplete
                        freeSolo
                        id="auto-complete-tag"
                        options={tags.map((tag) => tag.name)}
                        onChange={(e, value) => { setCurrentWrittenTag(value) }}
                        value={currentWrittenTag}
                        disabled={selectError}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                id="entry-tag"
                                label="Entry Tag"
                                style={{
                                    margin: 8,
                                    minWidth: 300
                                }}
                                placeholder="Write your tag here..."
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={currentWrittenTag}
                                onChange={e => setCurrentWrittenTag(e.target.value)}
                            />
                        )}
                    />
                    <Button
                        style={{
                            margin: 18
                        }}
                        variant="outlined"
                        color="primary"
                        className={classes.submit}
                        disabled={selectError}
                        onClick={addTag}
                    >
                        Add Tag
                    </Button>
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={!isAllFilled}
                >
                    Submit Entry
                </Button>
                <Typography className={classes.caption} color="textSecondary" variant="caption">
                    *Fuzzy-Forum supports markdown for more information visit: <Link color="inherit" href="https://commonmark.org/help/" >
                        https://commonmark.org/help/
                    </Link>
                </Typography>
            </form>
        </div>
    )
}

export default AddEntry;
