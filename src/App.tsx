import React, {useState} from 'react'
import './App.css'
import ShopList from './components/ShopList';
import {v1} from 'uuid';

export type GoodType = { id: string, title: string, inBacket: boolean }

export function App() {

    const [goods, setGoods] = useState<GoodType[]>([
        {id: v1(), title: 'milk', inBacket: false},
        {id: v1(), title: 'book', inBacket: true},
        {id: v1(), title: 'bear', inBacket: false},
        {id: v1(), title: 'salt', inBacket: false},
    ])

    function removeGood(goodID: string) {
        setGoods(goods.filter(g => g.id !== goodID))
    }

    function addGood(newTitle: string) {
        const newGood = {id: v1(), title: newTitle, inBacket: false}
        setGoods([newGood, ...goods])
    }

    function changeGoodStatus(goodID: string, newValue: boolean) {
        setGoods(goods.map(g => g.id === goodID ? {...g, inBacket: newValue} : g))
    }

    return (
        <div className="App">
            <ShopList
                title={'What to buy today'}
                goods={goods}
                removeGood={removeGood}
                addGood={addGood}
                changeGoodStatus={changeGoodStatus}
            />
        </div>
    )
}
