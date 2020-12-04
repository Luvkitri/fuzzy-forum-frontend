import React from 'react';

// interfaces
import { Tag, Thread } from '../../ts/interfaces/db_interfaces'

// @material-ui components
import { CardActions, Chip, Divider } from '@material-ui/core';

// @material-ui styles
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { createTrue } from 'typescript';

type Props = {
    thread: {
        id: number,
        name: string
    },
    tags: Tag[]
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chip: {
            margin: theme.spacing(0.5),
        }
    }),
);

const Footer: React.FC<Props> = ({ thread, tags }) => {
    const classes = useStyles();

    return (
        <CardActions>
            <Chip
                label={thread.name}
                clickable
                color="secondary"
                className={classes.chip}
            />
            {tags.map(tag => (
                <Chip
                    label={tag.name}
                    clickable
                    color="primary"
                />
            ))}
        </CardActions>
    );
}

export default Footer;
