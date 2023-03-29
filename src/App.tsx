import React, {useState} from 'react'
import './App.css'
import ShopList, {FilterType} from './components/ShopList';
import {v1} from 'uuid';

export type ShoplistType = {
    id: string, title: string, filter: FilterType
}

export type GoodType = { id: string, title: string, inBacket: boolean }

export type GoodsType = {
    [key: string]: GoodType[];
}

export function App() {

    let shoplistID1 = v1()
    let shoplistID2 = v1()

    let [shoplists, setShoplists] = useState<ShoplistType[]>([
        {id: shoplistID1, title: 'buy today', filter: 'all'},
        {id: shoplistID2, title: 'buy tomorrow', filter: 'all'},
    ])

    let [goods, setGoods] = useState<GoodsType>({
        [shoplistID1]: [
            {id: v1(), title: 'Book - HTML&CSS', inBacket: true},
            {id: v1(), title: 'Book - JS', inBacket: true},
            {id: v1(), title: 'Book - ReactJS', inBacket: false},

        ],
        [shoplistID2]: [
            {id: v1(), title: 'Book - Rest API', inBacket: false},
            {id: v1(), title: 'Book - GraphQL', inBacket: false},
        ]
    })

    function addGood(shoplistID: string, newTitle: string) {
        const newGood = {id: v1(), title: newTitle, inBacket: false}
        setGoods({...goods, [shoplistID]: [newGood, ...goods[shoplistID]]})
    }

    function removeGood(shoplistID: string, goodID: string) {
        setGoods({...goods, [shoplistID]: goods[shoplistID].filter(g => g.id !== goodID)})
    }

    function changeGoodStatus(shoplistID:string,goodID: string, newValue: boolean) {
        setGoods({...goods,[shoplistID]:goods[shoplistID].map(g=>g.id === goodID ? {...g,inBacket:newValue} : g)})
    }

    function changeFilterShoplist (shoplistID: string, filter: FilterType) {
        setShoplists(shoplists.map(s => s.id === shoplistID ? {...s, filter} : s))
    }

    function removeShoplist (shoplistID:string) {
        setShoplists(shoplists.filter(s=>s.id !== shoplistID));
        delete goods[shoplistID];
    }

    return (
        <div className="App">
            {shoplists.map(s => {
                return (
                    <ShopList
                        key={s.id}
                        shoplistID={s.id}
                        title={s.title}
                        goods={goods[s.id]}
                        addGood={addGood}
                        removeGood={removeGood}
                        changeGoodStatus={changeGoodStatus}
                        changeFilterShoplist={changeFilterShoplist}
                        removeShoplist={removeShoplist}
                        filter={s.filter}
                    />
                )
            })}

        </div>
    )
}
