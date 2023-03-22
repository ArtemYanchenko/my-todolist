import React, {useState} from 'react';
import './App.css';
import Shoplist from './components/Shoplist';
import {v1} from 'uuid';
import shoplist from './components/Shoplist';
import AddItemForm from './components/AddItemForm';

export type ShoplistType = {
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

    const [shoplists, setShoplists] = useState<ShoplistType[]>([
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
    function changeTitleGood(shoplistID: string, goodID: string, newTitle: string) {
        setGoods({...goods, [shoplistID]: goods[shoplistID].map(s => s.id === goodID ? {...s, title: newTitle} : s)})
    }
    function changeGoodStatus(shoplistID: string, goodID: string, checked: boolean) {
        console.log(shoplistID, goodID, checked)
        setGoods({...goods, [shoplistID]: goods[shoplistID].map(g => g.id === goodID ? {...g, inBacket: checked} : g)})
        console.log(goods);
    }
    function removeGood(shoplistID: string, goodID: string) {
        setGoods({...goods, [shoplistID]: goods[shoplistID].filter(g => g.id !== goodID)})
    }

    function addShoplist(title: string) {
        const newId = v1();
        const newShoplist: ShoplistType = {id: newId, title, filter: 'all'};
        setShoplists([newShoplist, ...shoplists]);
        setGoods({[newId]: [], ...goods})
    }
    function changeShoplistFilter(shoplistID: string, filter: FilterType) {
        setShoplists(shoplists.map(s => s.id === shoplistID ? {...s, filter} : s))
    }
    function changeShoplistTitle(shoplistID: string, newTitle: string) {
        setShoplists(shoplists.map(s => s.id === shoplistID ? {...s, title: newTitle} : s))
    }
    function removeShoplist(shoplistID: string) {
        setShoplists(shoplists.filter(s => s.id !== shoplistID))
        delete goods[shoplistID];
    }

    return (
        <div className="App">
            <AddItemForm callBack={addShoplist}/>
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
                        filter={s.filter}
                        addGood={addGood}
                        changeGoodStatus={changeGoodStatus}
                        changeGoodsFilter={changeShoplistFilter}
                        removeGood={removeGood}
                        changeTitleGood={changeTitleGood}
                        changeShoplistTitle={changeShoplistTitle}
                        removeShoplist={removeShoplist}
                    />
                )
            })}

        </div>
    )
}

export default App;
