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
    const password_check = document.querySelector(".form-floating[name=password_check]")

    if (password_check !== null) {
        const password_check_input = password_check.querySelector("input")

        if (password !== password_check_input.value && password_check_input.value !== "") {
            password_check_input.classList.remove(utils.class_valid)
            password_check_input.classList.add(utils.class_invalid)
            password_check.querySelector(".feedback").innerHTML = passwordCheckOnChange(password_check_input.value)
        } else if (password === password_check_input.value) {
            password_check_input.classList.add(utils.class_valid)
            password_check_input.classList.remove(utils.class_invalid)
        }
    }

    return (password.length < 6) || (password.length > 30) ? "6자 이상 30자 이하여야 합니다." : ""
}

const passwordCheckOnChange = (passowrd_check) => {
    return passowrd_check !== document.querySelector('input[name=password]').value ? "비밀번호와 비밀번호 확인이 같지 않습니다." : ""
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
            onChange: passwordCheckOnChange
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
                {/* <Login></Login> */}
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
