import { useState, useEffect } from "react"

import { send, List } from "../utils/utils"
import { Memo } from "./Memo"
import { CreateMemo } from "./CreateMemo"

import { localStorageAuth } from "../utils/utils"

export const MemoList = (props) => {
    const [memoList, setMemoList] = useState("loading...")

    const callback = (res) => {
        const list = [<CreateMemo />]
    
        res.data.forEach(item => {
            list.push(<Memo key={item.id} title={item.title} memo={item.memo}/>)
        })
        
        setMemoList(<List alignSelf="stretch" contents={list} />)
    }
    
    const fallback = (data) => {
        console.log(data)
    }

    useEffect(() => { send('/memo', 'GET', {}, callback, fallback) }, [])
    
    if (window.localStorage.getItem(localStorageAuth) === null) {
        window.location.href = "/login"
    }

    return memoList
}
