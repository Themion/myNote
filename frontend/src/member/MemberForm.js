import axios from 'axios'

import Input from './Input'

import styles from './MemberForm.module.css'

import utils from '../utils/utils'
import { useEffect } from 'react'

const MemberForm = (props) => {

    const onSubmit = (e) => {
        e.preventDefault();

        const inputs = document.querySelectorAll(".card-body .form-control"), params = {};
        let is_valid = false

        inputs.forEach(input => {
            params[input.name] = input.value
            is_valid = is_valid && input.classList.contains("is-invalid")
        })

        console.log(is_valid)
        if (is_valid) console.log(params)

        if (is_valid) axios({
            url: props.url,
            method: 'post',
            params: params,
            baseURL: utils.baseURL
        }).then(res => {
            if (res.ok) window.location.href = "/"
        })
    }

    useEffect(() => {})

    const input_list = []

    props.inputs.forEach(input => {
        input_list.push(<Input 
            key={input.for} 
            for={input.for} 
            required={input.required} 
            onChange={input.onChange} />)
    })

    return (
        <div className={`card ` + styles.card}>
            <div className="card-body">
                <a className="float-end btn btn-outline-primary" href={props.link.to}>{props.link.text}</a>
                <h4 className="card-title mb-4 mt-1">{props.name}</h4>
                <form id="signup" onSubmit={onSubmit} className="needs-validation" noValidate>
                    {input_list}
                    <div className="form-floating mb-3">
                        <button className="btn btn-primary btn-block text-white" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MemberForm
