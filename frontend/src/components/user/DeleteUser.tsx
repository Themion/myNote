import { useNavigate } from "react-router-dom"
import { Callback, Fallback, send } from "../../utils/utils"
import { Card } from "../Card"
import { Modal } from "../Modal"
import { Input } from "./Input"

export const DeleteUser = () => {
    const navigate = useNavigate()

    const modalId = "deleteUser"

    const onClick = () => {
        const callback: Callback = (res) => {
            navigate('/logout')
        }
    
        const fallback: Fallback = (response) => {
            navigate('/user?error')
        }

        if (window.confirm("정말로 탈퇴하시겠습니까?")) {
            const input = document.querySelector(`#${modalId} input`) as HTMLInputElement
            send({url: '/user', method: 'DELETE'}, {password: input.value}, callback, fallback)
        }
    }

    const body = 
        <div>
            <button 
                type="button" 
                className="btn btn-danger" 
                data-bs-toggle="modal" 
                data-bs-target={'#' + modalId}>
                회원탈퇴
            </button>
            <Modal
                id={modalId}
                title="Delete User"
                content={
                    <div>
                        <p>회원 탈퇴를 위해선 비밀번호를 입력해주세요.</p>
                        <Input name="password" type="password" />
                    </div>
                }
                btn={[{color: "danger", onClick: onClick}]} />
        </div>

    return <Card title="Delete User" body={body} />
}
