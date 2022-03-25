// import { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import Input from './member/Input';
import MemberForm from "./member/MemberForm"

// import utils from "./utils/utils"

const SignUp = () => {
    return (
        <MemberForm inputs={[
            <Input key="username" for="username" required />, 
            <Input key="password" for="password" required />, 
            <Input key="nickname" for="nickname" />
        ]} link = {{to: "/login", text: "Log In"}} url="/member"/>
    )
}

const LogIn = () => {
    return (
        <MemberForm inputs={[
            <Input key="username" for="username" required />, 
            <Input key="password" for="password" required />
        ]} link = {{to: "/signup", text: "Sign Up"}} url=""/>
    )
}

function App() {
    return (
        <div className="App container">
            <div className="row justify-content-center">
                {/* <Login></Login> */}
                <Router><Routes>
                    <Route path="/login" element={LogIn()}></Route>
                    <Route path="/signup" element={SignUp()}></Route>
                    {/* <Route path="/signup" element={<SignUp />}></Route> */}
                    {/* <Route path="/" element={<Table />}></Route> */}
                    <Route path="*" element={<Navigate to="/signup" />} />
                </Routes></Router>
            </div>
        </div>
    )
}

export default App;
