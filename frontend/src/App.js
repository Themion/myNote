import { useState, useEffect } from 'react'
import axios from 'axios'

const url = "http://localhost:12345"

function App() {
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
}

export default App;
