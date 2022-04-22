import { useState, useEffect, memo } from "react"

import { send } from "../utils/utils"
import { Memo } from "./Memo"
import { CardList } from "../utils/Card"

import { localStorageAuth } from "../utils/utils"

export const MemoList = (props) => {
    const [memoList, setMemoList] = useState("loading...")

    const callback = (res) => {
        console.log(res)
        const list = []
        res.data.forEach(item => {
            list.push(<Memo key={item.id} title={item.title} memo={item.memo}/>)
        })
        console.log(list)
        setMemoList(<CardList contents={list} />)
    }
    
    const fallback = (data) => {
        console.log(data)
    }

    useEffect(() => {send('/memo', 'GET', {}, callback, fallback)}, [])
    
    if (window.localStorage.getItem(localStorageAuth) === null) {
        window.location.href = "/login"
    }

    return (
        <div>
            {memoList}
        </div>
    )
}