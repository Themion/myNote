import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { List } from "../components/List"
import { send, sendTo } from "../utils/utils"
import { Memo, CreateMemo, Props as MemoProps } from "./Memo"
import { getAccessToken } from "../utils/session"

export const MemoList = () => {
    const [memoList, setMemoList] = useState(<p>loading...</p>)
    const navigate = useNavigate()

    const callback = (res: any) => {
        const list = [<CreateMemo />]
    
        res.data.forEach((item: Partial<MemoProps>) => {
            list.push(<Memo key={item.id} {...item}/>)
        })
        
        setMemoList(<List alignSelf="stretch" contents={list} />)
    }
    
    const fallback = (response: any) => {
        console.log(response)
    }

    useEffect(() => {
        const to: sendTo = {
            url: '/memo',
            method: 'GET'
        }

        send(to, {}, callback, fallback)
    }, [])

    if (getAccessToken() === null) navigate("/login")

    return memoList!
}
