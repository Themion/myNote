import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import { Login, Logout } from "./user/Login"
import { SignUp } from './user/SignUp';
import { Config } from "./user/Config"
import { MemoList } from './memo/MemoList';

import { manageTokens } from './utils/session';

function App () {
    manageTokens()
    
    return (
        <div className="App container">
            <Router><Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/user" element={<Config />} />
                <Route path="/" element={<MemoList />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes></Router>
        </div>
    )
}

export default App;
