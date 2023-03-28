import React from 'react'
import './App.css'
import ShopList from './components/ShopList';
import {v1} from 'uuid';

export type GoodType = { id: string, title: string, inBacket: boolean }

export function App() {

    const goods:GoodType[] = [
        {id: v1(), title: 'milk', inBacket: false},
        {id: v1(), title: 'book', inBacket: true},
        {id: v1(), title: 'bear', inBacket: false},
        {id: v1(), title: 'salt', inBacket: false},
    ]

    return (
        <div className="App">
            <ShopList title={'What to buy today'} goods={goods}/>
        </div>
    )
}
