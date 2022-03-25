import axios from 'axios'

import styels from './SignUp.module.css'

import utils from '../utils/utils'
import { useState } from 'react'

/* function SignUp_MVP() {
    return(
        <section>
            <form>
                <header><h2>Sign Up</h2></header>
                <label for="username">username</label>
                <input type="text" id="username" name="username" placeholder="username"></input>
                <label for="password">password</label>
                <input type="text" id="password" name="password" placeholder="password"></input>
                <label for="nickname">nickname</label>
                <input type="text" id="nickname" name="nickname" placeholder="nickname"></input>
                <button type="submit">Sign up</button>
            </form>
        </section>
    )
} */

function SignUp() {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [nickname, setNickname] = useState("")

    const setState = {
        "username": setUserName,
        "password": setPassword,
        "nickname": setNickname
    }

    const onSubmit = (e) => {
        e.preventDefault();

        axios({
            url: '/member',
            method: 'post',
            params: {
                username: username,
                password: password,
                nickname: nickname
            },
            baseURL: utils.url
        }).then(res => console.log(res.data))
    }

    const onChange = (e) => {
        setState[e.target.name](e.target.value)
    }

    return (
        <div className={`card ` + styels.card}>
            <div className="card-body">
                <a className="float-end btn btn-outline-primary" href="/register">Sign In</a>
                <h4 className="card-title mb-4 mt-1">Sign Up</h4>
                <form name="signup" onSubmit={onSubmit}>

                    {/* username */}
                    <div className="form-floating mb-3">
                        <input 
                            className="form-control" 
                            name="username" 
                            type="text" 
                            placeholder=" "
                            onChange={onChange} />
                        <label htmlFor="username">username</label>
                    </div>
                    {/* username */}

                    {/* password */}
                    <div className="form-floating mb-3">
                        <input 
                            className="form-control" 
                            name="password" 
                            type="password" 
                            placeholder=" "
                            onChange={onChange} />
                        <label htmlFor="password">password</label>
                    </div>
                    {/* password */}

                    {/* nickname */}
                    <div className="form-floating mb-3">
                        <input 
                            className="form-control" 
                            name="nickname" 
                            type="text" 
                            placeholder=" "
                            onChange={onChange} />
                        <label htmlFor="nickname">nickname</label>
                    </div>
                    {/* nickname */}

                    {/* submit */}
                    <div className="form-floating mb-3">
                        <button className="btn btn-primary btn-block text-white" type="submit">Submit</button>
                    </div>
                    {/* submit */}

                </form>
            </div>
        </div>
    )
}

export default SignUp;
