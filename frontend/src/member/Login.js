import axios from 'axios'

import styels from './Login.module.css'

import url from '../utils/utils'
import { useState } from 'react'

/* function Login_MVP() {
    return(
        <section>
            <form>
                <header><h2>Log In</h2></header>
                <label for="username">username</label>
                <input type="text" id="username" name="username" placeholder="username"></input>
                <label for="password">password</label>
                <input type="text" id="password" name="password" placeholder="password"></input>
                <button type="submit">Log in</button>
                <button>Sign up</button>
            </form>
        </section>
    )
} */

function Login() {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const setState = {
        "username": setUserName,
        "password": setPassword
    }

    const onSubmit = (e) => {
        console.log(username)
        console.log(password)

        e.preventDefault();
    }

    const onChange = (e) => {
        setState[e.target.name](e.target.value)
    }
    return (
        <div className={`card ` + styels.card}>
            <div className="card-body">
                <a className="float-end btn btn-outline-primary" href="/register">Sign Up</a>
                <h4 className="card-title mb-4 mt-1">Sign In</h4>
                <form name="login">

                    <div className="form-floating mb-3">
                        <input 
                            className="form-control" 
                            name="username" 
                            type="text" 
                            placeholder=" "
                            onChange={onChange} />
                        <label htmlFor="username">username</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input 
                            className="form-control" 
                            name="password" 
                            type="password" 
                            placeholder=" "
                            onChange={onChange} />
                        <label htmlFor="password">password</label>
                    </div>

                    <div className="form-floating mb-3">
                        <button className="btn btn-primary btn-block text-white" type="submit">Submit</button>
                    </div>

                </form>
            </div>
        </div>
    )
}


export default Login;
