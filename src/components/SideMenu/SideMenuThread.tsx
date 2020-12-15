import React, { useState } from 'react';

// interfaces
import { SubThread } from '../../ts/interfaces/db_interfaces'

// Components
import SideMenuSubThread from './SideMenuSubThread';

// @material-ui componentes
import {
    Collapse,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';

// @material-ui icons
import { ExpandLess, ExpandMore } from '@material-ui/icons';

type Props = {
    key: number
    name: string
    subThreads: SubThread[]
}

const Thread: React.FC<Props> = ({ key, name, subThreads }) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={name} />
                {subThreads.length > 0 && (open  ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {subThreads.map((subThread) => (
                        <SideMenuSubThread key={subThread.id} name={subThread.name} />
                    ))}
                </List>
            </Collapse>
        </div>
    );
}

export default Thread;
