// import { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import { SignUp, Login, Logout } from "./user/UserForm"
import { Config } from "./user/UserConfig"

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
            <div className="row justify-content-center">
                <Router><Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/user" element={<Config />} />
                    <Route path="/" element={<Debug />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes></Router>
            </div>
        </div>
    )
}

export default App;
