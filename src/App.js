import React, { useState } from 'react';
import AppContext from './components/authorized';
import Form from "./components/Form";
import FormRegister from "./components/FormRegister/index";
import FormLogin from "./components/FormLogin/index";
import LoginOrRegister from "./components/Front/index";

import {HashRouter as Router, Switch, Route} from 'react-router-dom';

// components

//styles

function App() {

    const [authorized, setAuthorized] = useState("");
    //const [token, setToken] = useState("");
    const [user, setUser] = useState("");

    const authorizedOrNot = (trueorFalse) => {
        setAuthorized(trueorFalse)
    };
    const setUserLoggedIn = (user) => {
        setUser(user)
    };

    const userSetting = {
        authorized: authorized,
        authorizedOrNot,
        user: user,
        setUserLoggedIn

    };

        return (
            <Router basename="/">
                <AppContext.Provider value={userSetting}>
                
                <div className="App">
                    <Switch>
                        <Route path="/" exact component={() => <LoginOrRegister/>}></Route> 
                        <Route path="/docs" component={() => <Form />}></Route> 
                        <Route path="/registrera" component={FormRegister}></Route>
                        <Route path="/login" component={FormLogin}></Route> 

                    </Switch>
                </div>
                </AppContext.Provider>

            </Router>
        )
    }




export default App;

