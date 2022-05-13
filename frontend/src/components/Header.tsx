import { getAccessToken, getNickname } from "../utils/session";
import { MemoModal } from "./memo/MemoModal"

const Button = () => {
    const token = getAccessToken()
    const text = `Log ${token ? 'out' : 'in'}`
    const url = token ? '/logout' : '/login'
    const className = `btn-outline-${token ? 'danger' : 'primary'}`

    return (
        <button 
            type="button" 
            className={`btn btn-sm ${className} ms-auto`} >
            <a href={url}>{text}</a>
        </button>
    )
}

const Header = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
            <div className="container-fluid">

                {/* 홈 버튼 */}
                <a className="navbar-brand" href="/">myNote</a>
                {/* 홈 버튼 */}

                {/* 메뉴 접는 버튼 */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* 메뉴 접는 버튼 */}

                {/* 메뉴 목록 */}
                <div className="collapse navbar-collapse" id="menu">
                    <div className="navbar-nav">
                        <a className="nav-link" href="/user">{getNickname()}</a>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/memo" id="menu-memo" role="button" data-bs-toggle="dropdown">
                                Memo
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="/">
                                        Memo List
                                    </a>
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
