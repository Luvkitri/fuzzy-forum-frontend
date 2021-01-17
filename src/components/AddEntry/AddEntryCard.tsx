import React, { useState, useContext } from 'react';

// interfaces
import { Thread } from '../../ts/interfaces/db_interfaces';

// types
import { EntriesContextType } from '../../ts/types/context_types';

// context
import { EntriesContext } from '../../context/Entries';

// components
import AddEntry from './index';

// @material-ui components
import {
    Button,
    Card,
    CardActions,
    CardHeader,
    Container,
    Modal,
    Typography
} from '@material-ui/core';

// @material-ui styles
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

type Props = {
    numberOfEntries: number
    threads: Thread[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            [theme.breakpoints.up('md')]: {
                marginLeft: theme.spacing(30),
            },
        },
        toolbar: theme.mixins.toolbar,
        card: {
            minWidth: 300,
            margin: 10
        },
        header: {
            flex: 0.5
        },
        actions: {
            marginLeft: 10
        },
        modal: {
            outline: 'none'
        }
    }),
);

const AddEntryCard: React.FC<Props> = ({ numberOfEntries, threads }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const { entriesRefreshKey, setEntriesRefreshKey, selectedRange } = useContext<EntriesContextType>(EntriesContext);


    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setEntriesRefreshKey(entriesRefreshKey + 1);
    }

    return (
        <div className={classes.root}>
            <div className={classes.toolbar} />
            <Container maxWidth="xl">
                <Card className={classes.card}>
                    <CardHeader
                        className={classes.header}
                        title={
                            <Typography variant="h4" component="h2">
                                Forum Entries{selectedRange !== '' && `: ${selectedRange}`}
                            </Typography>
                        }
                        subheader={`Total entries ${numberOfEntries}`}
                    />
                    <CardActions className={classes.actions}>
                        <Button size="large" color="primary" onClick={handleOpen}>Add Entry</Button>
                    </CardActions>
                </Card>
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
            >
                <div className={classes.modal}>
                    <AddEntry threads={threads} />
                </div>
            </Modal>
        </div>
    )
}

export default AddEntryCard;
