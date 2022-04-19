// import { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import { Login, Logout } from "./user/Login"
import { SignUp } from './user/SignUp';
import { Config } from "./user/Config"

function Debug() {
    return (
        <div>
            {window.localStorage.getItem("authorization") !== null}
        </div>
    )
}

function App() {
    return (
        <div className="App container">
            <Router><Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/user" element={<Config />} />
                <Route path="/" element={<Debug />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes></Router>
        </div>
    )
}

export default App;
