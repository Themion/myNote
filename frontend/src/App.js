// import { useState, useEffect } from 'react'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import { SignUp, LogIn } from "./member/MemberForm"

import utils from "./utils/utils"

function App() {
    return (
        <div className="App container">
            <div className="row justify-content-center">
                <Router><Routes>
                    <Route path="/login" element={<LogIn />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes></Router>
            </div>
        </div>
    )
}

export default App;
