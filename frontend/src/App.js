import { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import Login from "./member/Login"
import SignUp from './member/SignUp'

import utils from "./utils/utils"

/* function App() {
    const [text, setText] = useState("")

    useEffect(
        () => {
            axios.get(utils.url + '/').then(res => setText(res.data.username))
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
                {/* <Login></Login> */}
                <Router><Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    {/* <Route path="/" element={<Table />}></Route> */}
                    <Route path="*" element={<Navigate to="/signup" />} />
                </Routes></Router>
            </div>
        </div>
    )
}

export default App;
