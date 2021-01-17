import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';

// context
import { UserDataContext } from '../../context/User';
import { UserDataContextType } from '../../ts/types/context_types';

// @material-ui components 
import {
    Paper,
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

const UserAnswers: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();

    // context
    const { userData } = useContext<UserDataContextType>(UserDataContext);

    return (
        <TableContainer className={classes.table}>
            <Table stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Index</TableCell>
                        <TableCell align="right" style={{ minWidth: 250 }}>In Entry With Title</TableCell>
                        <TableCell align="right" style={{ minWidth: 50 }}>Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userData?.Answers.map((answer, index) => (
                        <TableRow className={classes.row} key={index} hover onClick={e => { history.push(`/${answer.entry_id}`) }} >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="right">{userData.Entries.find(entry => entry.id === answer.entry_id)?.title}</TableCell>
                            <TableCell align="right">{answer.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UserAnswers;
