import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import { Login, Logout } from "./user/Login"
import { SignUp } from './user/SignUp';
import { Config } from "./user/Config"
import { MemoList } from './routes/Home';
import Header from './components/Header';
import { AuthWrapper, NoAuthWrapper } from './components/AuthWrapper';

import { manageTokens } from './utils/session';

function App () {
    manageTokens()
    
    return (
        <Router>
            <Header />
            <div className="App container">
                <Routes>
                    <Route path="/login" element={
                        <NoAuthWrapper>
                            <Login />
                        </NoAuthWrapper>
                    } />
                    <Route path="/logout" element={
                        <AuthWrapper>
                            <Logout />
                        </AuthWrapper>
                    } />
                    <Route path="/signup" element={
                        <NoAuthWrapper>
                            <SignUp />
                        </NoAuthWrapper>
                    } />
                    <Route path="/user" element={
                        <AuthWrapper>
                            <Config />
                        </AuthWrapper>
                    } />
                    <Route path="/" element={
                        <AuthWrapper>
                            <MemoList />
                        </AuthWrapper>
                    } />
                </Routes>
            </div>
        </Router>
    )
}

export default App;
