import { useState, useEffect } from "react"

import { List } from "../components/List"
import { send, getSession, removeSession } from "../utils/utils"
import { Memo, CreateMemo } from "./Memo"

export const MemoList = (props) => {
    const [memoList, setMemoList] = useState("loading...")

    const callback = (res) => {
        const list = [<CreateMemo />]
    
        res.data.forEach(item => {
            list.push(
                <Memo 
                    key={item.id} 
                    memoId={item.id} 
                    title={item.title} 
                    memo={item.memo}/>
            )
        })
        
        setMemoList(<List alignSelf="stretch" contents={list} />)
    }
    
    const fallback = (response) => {
        console.log(response)
        window.localStorage.setItem('error', JSON.stringify(response))
        removeSession()
    }

    useEffect(() => { send('/memo', 'GET', {}, callback, fallback) }, [])
    
    if (getSession() === null) window.location.href = "/login"

    return memoList
}
