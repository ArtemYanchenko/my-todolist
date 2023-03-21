import React, {useState} from 'react';
import './App.css';
import Shoplist from './components/Shoplist';
import {v1} from 'uuid';
import shoplist from './components/Shoplist';

export type Shoplist = {
    id: string
    title: string
    filter: FilterType
}

export type GoodType = {
    id: string
    title: string
    inBacket: boolean
}

export type GoodsType = {
    [key: string]: GoodType[];
}

export type FilterType = 'all' | 'need to buy' | 'in basket';

function App() {

    const shoplistID1 = v1();
    const shoplistID2 = v1();

    const [shoplists, setShoplists] = useState<Shoplist[]>([
        {id: shoplistID1, title: 'shop today', filter: 'all'},
        {id: shoplistID2, title: 'shop later', filter: 'all'},
    ])

    const [goods, setGoods] = useState<GoodsType>({
        [shoplistID1]: [
            {id: v1(), title: 'Milk', inBacket: true},
            {id: v1(), title: 'Bear', inBacket: false},
            {id: v1(), title: 'Book', inBacket: false},
        ],
        [shoplistID2]: [
            {id: v1(), title: 'Fish', inBacket: false},
            {id: v1(), title: 'Water', inBacket: false},
            {id: v1(), title: 'Soda', inBacket: false},
        ]
    })

    function addGood(shoplistID: string, title: string) {
        const newGood = {id: v1(), title, inBacket: false};
        setGoods({...goods, [shoplistID]: [newGood, ...goods[shoplistID]]})
    }
    function deleteGood(shoplistID: string, goodID: string) {
        setGoods({...goods, [shoplistID]: goods[shoplistID].filter(g => g.id !== goodID)})
    }
    function changeGoodStatus(shoplistID: string, goodID: string, checked: boolean) {
        console.log(shoplistID,goodID,checked)
        setGoods({...goods, [shoplistID]: goods[shoplistID].map(g => g.id === goodID ? {...g, inBacket: checked} : g)})
        console.log(goods);
    }
    function changeGoodsFilter(shoplistID: string, filter: FilterType) {
        setShoplists(shoplists.map(s => s.id === shoplistID ? {...s, filter} : s))
    }
    function removeShoplist (shoplistID:string) {
        setShoplists(shoplists.filter(s=>s.id !== shoplistID))
        delete goods[shoplistID];
    }

    return (
        <div className="App">
            {shoplists.map(s => {

                function filterGoods(goods: GoodType[], filterValue: FilterType) {
                    switch (filterValue) {
                        case 'need to buy':
                            return goods.filter(g => !g.inBacket);
                        case 'in basket':
                            return goods.filter(g => g.inBacket);
                        default:
                            return goods;
                    }
                }

                const goodsForRender = filterGoods(goods[s.id], s.filter)

                return (
                    <Shoplist
                        key={s.id}
                        shoplistID={s.id}
                        title={s.title}
                        goods={goodsForRender}
                        addGood={addGood}
                        deleteGood={deleteGood}
                        changeGoodStatus={changeGoodStatus}
                        changeGoodsFilter={changeGoodsFilter}
                        filter={s.filter}
                        removeShoplist={removeShoplist}
                    />
                )
            })}

        </div>
    )
}

export default App;
