import React, { useState, useMemo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { isLoggedIn, getUserData } from './utils/auth';

// interfaces
import { LogedInUser } from './ts/interfaces/res_interfaces';

// context
import { UserContext } from './context/User';

// containers
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Entry from './containers/Entry';
import User from './containers/User';

const App: React.FC = () => {
    const [user, setUser] = useState<LogedInUser | null>(null);
    const memoizedUser = useMemo(() => ({ user, setUser }), [user, setUser]);

    const getUser = async () => {
        const userData = await getUserData();
        setUser(userData);
    }

    if (isLoggedIn() && user === null) {
        getUser();
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <UserContext.Provider value={memoizedUser}>
                        <Route path="/users/login" exact component={Login} />
                        <Route path="/users/signup" exact component={Signup} />
                        <Route path="/users/profile/:userId" exact component={User} />
                        <Route path="/:entryId" exact component={Entry} />
                        <Route path="/" exact component={Home} />
                    </UserContext.Provider>
                    <Route path="/" render={() => <div><h1>404</h1></div>} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
