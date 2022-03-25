/* function Header_MVP() {
    return (
        <header>
            <nav>
                <a href="/">myNote</a>
                <ul>
                    <li><a href="/user">User</a></li>
                    <li>
                        <a href="#">Memo</a>
                        <ul>
                            <li>Create Memo</li>
                            <li>Delete Memo</li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    )
} */

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
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
                        <a className="nav-link" href="#">User</a>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="menu-memo" role="button" data-bs-toggle="dropdown">
                                Memo
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Create Memo</a></li>
                                <li><a className="dropdown-item" href="#">Delete Memo</a></li>
                            </ul>
                        </li>
                    </div>
                </div>
                {/* 메뉴 목록 */}

            </div>
        </nav>
    )
}

export default Header;
