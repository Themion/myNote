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
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">

                {/* 홈 버튼 */}
                <a class="navbar-brand" href="/">myNote</a>
                {/* 홈 버튼 */}

                {/* 메뉴 접는 버튼 */}
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
                    <span class="navbar-toggler-icon"></span>
                </button>
                {/* 메뉴 접는 버튼 */}

                {/* 메뉴 목록 */}
                <div class="collapse navbar-collapse" id="menu">
                    <div class="navbar-nav">
                        <a class="nav-link" href="#">User</a>
                        <a class="nav-link dropdown-toggle" href="#" id="menu-memo" role="button" data-bs-toggle="dropdown">
                            Memo
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="menu-memo">
                            <li><a class="dropdown-item" href="#">Create Memo</a></li>
                            <li><a class="dropdown-item" href="#">Delete Memo</a></li>
                        </ul>
                    </div>
                </div>
                {/* 메뉴 목록 */}

            </div>
        </nav>
    )
}

export default Header;
