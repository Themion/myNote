// import { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import MemberForm from "./member/MemberForm"

import utils from "./utils/utils"

const passwordOnChange = (password) => {
    if (password !== document.querySelector('input[name=password]').value) 
        return "비밀번호와 비밀번호 확인이 같지 않습니다."
    return (password.length < 6) || (password.length > 30) ? "6자 이상 30자 이하여야 합니다." : ""
}

const SignUp = () => {
    return (
        <MemberForm name="Sign up" inputs={[{
            for: "username",
            required: true
        }, {
            for: "password",
            required: true,
            onChange: passwordOnChange
        }, {
            for: "password_check",
            required: true,
            onChange: passwordOnChange
        }, {
            for: "nickname"
        }]} link={{ to: "/login", text: "Log in" }} url="/member" />
    )
}

const LogIn = () => {
    return (
        <MemberForm name="Log in" inputs={[{
            for: "username",
            required: true
        }, {
            for: "password",
            required: true,
            onChange: passwordOnChange
        }]} link={{ to: "/signup", text: "Sign up" }} url="/member" />
    )
}

function App() {
    return (
        <div className="App container">
            <div className="row justify-content-center">
                <Router><Routes>
                    <Route path="/login" element={<LogIn />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="*" element={<Navigate to="/signup" />} />
                </Routes></Router>
            </div>
        </div>
    )
}

export default App;
