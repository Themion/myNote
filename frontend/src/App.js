import { useState, useEffect } from 'react'
import axios from 'axios'

import Login from "./member/Login"
import SignUp from './member/SignUp'

const url = "http://localhost:8080"

/* function App() {
    const [text, setText] = useState("")

    useEffect(
        () => {
            axios.get(url + '/').then(res => setText(res.data.username))
        }, []
    )

    return (
        <div className="App">
            username: {text}
        </div>
    );
} */

function App() {
    return (
        <div className="App container">
            <div className="row justify-content-center">
                <Login></Login>
                <SignUp></SignUp>
            </div>
        </div>
    )
}

export default App;
