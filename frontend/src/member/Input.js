import utils from '../utils/utils'

const Input = (props) => {
    return (
        <div className="form-floating mb-3">
            <input
                className="form-control"
                required={props.required}
                name={props.for}
                type={props.for === "password" ? "password" : "text"}
                placeholder=" " 
                onChange={(e) => {
                    if (props.required && e.target.value.length === 0) {
                        e.target.classList.add(utils.class_invalid)
                    }
                    else {
                        e.target.classList.remove(utils.class_invalid)
                    }
                }}/>
            <label htmlFor={props.for} className="form-label">{props.for}</label>
        </div>
    )
}

export default Input
