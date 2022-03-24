import styels from './SignUp.module.css'

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
    return (
        <div className={`card ` + styels.card}>
            <div className="card-body">
                <a className="float-end btn btn-outline-primary" href="/register">Sign In</a>
                <h4 className="card-title mb-4 mt-1">Sign Up</h4>
                <form name="login" action="/login" method="POST">
                    <div className="form-floating mb-3">
                        <input className="form-control" name="username" type="username" placeholder="username" />
                        <label htmlFor="username">username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" name="password" type="password" placeholder="******" />
                        <label htmlFor="password">password</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" name="nickname" type="nickname" placeholder="nickname" />
                        <label htmlFor="nickname">nickname</label>
                    </div>
                    <div className="form-floating mb-3">
                        <button className="btn btn-primary btn-block text-white" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
