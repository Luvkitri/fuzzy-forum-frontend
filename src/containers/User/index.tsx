import React, { useContext, useEffect, useMemo, useState } from 'react';

// components
import Header from '../../components/Header';
import Profile from '../../components/Profile'

// context
import { EntriesContext } from '../../context/Entries'

// @material-ui components
import { CssBaseline } from '@material-ui/core';
import axios from 'axios';
import { Entry } from '../../ts/interfaces/db_interfaces';
import { getAuthAxios } from '../../utils/auth';
import { UserData } from '../../ts/interfaces/res_interfaces';
import { UserContext, UserDataContext } from '../../context/User';
import { UserContextType } from '../../ts/types/context_types';
import { Redirect } from 'react-router-dom';

const User: React.FC = () => {
    const [userData, setUserData] = useState<UserData>(Object);

    // context
    const { user } = useContext<UserContextType>(UserContext);

    const memoizedEntries = useMemo(() => ({
        userData,
        setUserData,
    }), [userData, setUserData]);

    useEffect(() => {
        const fetchItems = async () => {
            if (user === null || user === undefined) {
                return;
            }

            try {
                const authAxios = getAuthAxios();
                const res = await authAxios.get(`${process.env.REACT_APP_API_URL}/users/${user.id}`)
                const responseObj = res.data;

                if (!responseObj.success) {
                    console.log(responseObj.error);
                }

                setUserData(responseObj.userData);
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchItems();
    }, [setUserData]);

    if (user === null || user === undefined) {
        console.log("hell?")
        return <Redirect to="/" />
    }

    return (
        <div>
            <UserDataContext.Provider value={memoizedEntries}>
                <CssBaseline />
                <Header sideMenu={false} />
                <Profile />
            </UserDataContext.Provider>
        </div>
    )
};

export default User;
