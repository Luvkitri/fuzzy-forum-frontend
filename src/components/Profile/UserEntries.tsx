import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

// @material-ui components 
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';

// @material-ui styles
import {
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core/styles';
import { UserDataContext } from '../../context/User';
import { UserDataContextType } from '../../ts/types/context_types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            maxHeight: 350
        },
        row: {
            cursor: 'pointer'
        }
    })
);

const UserEntries: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();

    // context
    const { userData } = useContext<UserDataContextType>(UserDataContext);

    return (
        <TableContainer className={classes.table}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Index</TableCell>
                        <TableCell align="right" style={{ minWidth: 250 }}>Title</TableCell>
                        <TableCell align="right" style={{ minWidth: 50 }}>Score</TableCell>
                        <TableCell align="right" style={{ minWidth: 50 }}>Answers</TableCell>
                        <TableCell align="right" style={{ minWidth: 50 }}>Active</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userData?.Entries.map((entry, index) => (
                        <TableRow className={classes.row} key={index} hover onClick={e => { history.push(`/${entry.id}`) }}>
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="right">{entry.title}</TableCell>
                            <TableCell align="right">{entry.score}</TableCell>
                            <TableCell align="right">{entry.answers}</TableCell>
                            <TableCell align="right">{entry.active.toString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UserEntries
