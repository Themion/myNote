// import { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import { SignUp, Login, Logout } from "./user/UserForm"

function Debug() {
    return (
        <div>
            {window.localStorage.getItem("authorization")}
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
                    <Route path="/" element={<Debug />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes></Router>
            </div>
        </div>
    )
}

export default App;
