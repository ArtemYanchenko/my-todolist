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

    return (
        <div className="App">
            <ShopList
                title={'What to buy today'}
                goods={goods}
                removeGood={removeGood}
            />
        </div>
    )
}
