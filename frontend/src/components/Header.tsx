import { getAccessToken, getNickname } from "../utils/session";
import { MemoModal } from "./memo/MemoModal"
import { Link } from "react-router-dom";

const Button = () => {
    const token = getAccessToken()
    const text = `Log ${token ? 'out' : 'in'}`
    const url = token ? '/logout' : '/login'
    const className = `btn-outline-${token ? 'danger' : 'primary'}`

    return (
        <Link to={url} className="ms-auto">
            <button 
                type="button" 
                className={`btn btn-sm ${className}`} >
                {text}
            </button>
        </Link>
    )
}

const Header = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
            <div className="container-fluid">

                {/* 홈 버튼 */}
                <Link className="navbar-brand" to='/'>myNote</Link>
                {/* 홈 버튼 */}

                {/* 메뉴 접는 버튼 */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* 메뉴 접는 버튼 */}

                {/* 메뉴 목록 */}
                <div className="collapse navbar-collapse" id="menu">
                    <div className="navbar-nav">
                        <Link className="nav-link" to='/user'>{getNickname()}</Link>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/memo" id="menu-memo" role="button" data-bs-toggle="dropdown">
                                Memo
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to='/'>Memo List</Link>
                                </li>
                                <li>
                                    <div 
                                        className="dropdown-item" 
                                        data-bs-toggle="modal"
                                        data-bs-target="#memo-create" >
                                        Create Memo
                                    </div>
                                    
                                </li>
                            </ul>
                        </li>
                    </div>

                    <Button />
                </div>
                {/* 메뉴 목록 */}

            </div>
            <MemoModal />
        </nav>
    )
}

export default Header;
