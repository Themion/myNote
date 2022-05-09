import { useState, useEffect } from "react"

import { List } from "../components/List"
import { Callback, Fallback, send } from "../utils/utils"
import { Memo, CreateMemo, Props as MemoProps } from "../components/memo/Memo"

export const Home = () => {
    const [memoList, setMemoList] = useState(<p>loading...</p>)

    const callback: Callback = (res) => {
        const list = [<CreateMemo />]
        res.data.forEach((item: Partial<MemoProps>) => { list.push(<Memo key={item.id} {...item}/>) })
        setMemoList(<List alignSelf="stretch" contents={list} />)
    }
    
    const fallback: Fallback = (response) => {
        console.log(response)
    }

    useEffect(() => { send({ url: '/memo', method: 'GET' }, {}, callback, fallback) }, [])

    return memoList!
}
