import styles from './MemberForm.module.css'

const MemberForm = (props) => {

    const onSubmit = (e) => {
        e.preventDefault();

        const inputs = document.querySelector("#signup").querySelectorAll(".form-control")
        const params = {}

        inputs.forEach(input => {
            params[input.name] = input.value
        })

        console.log(params)

        /* axios({
            url: props.url,
            method: 'post',
            params: params,
            baseURL: utils.baseURL
        }).then(res => {
            if (res.ok) window.location.href = "/"
        }) */
    }

    return (
        <div className={`card ` + styles.card}>
            <div className="card-body">
                <a className="float-end btn btn-outline-primary" href={props.link.to}>{props.link.text}</a>
                <h4 className="card-title mb-4 mt-1">Sign Up</h4>
                <form id="signup" onSubmit={onSubmit} className="needs-validation" noValidate>
                    {/* <Input for="username" required />
                    <Input for="password" required />
                    <Input for="nickname" /> */}

                    {props.inputs}
                    <div className="form-floating mb-3">
                        <button className="btn btn-primary btn-block text-white" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MemberForm
