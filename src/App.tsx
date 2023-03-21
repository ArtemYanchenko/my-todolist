import React, {useState} from 'react';
import './App.css';
import Shoplist from './components/Shoplist';
import {v1} from 'uuid';

export type Shoplist = {
    id: string
    title: string
    filter: FilterType
}

export type GoodType = {
    id: string
    title: string
    inBacket: boolean}

export type GoodsType = {
    [key:string]:GoodType[];
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
        [shoplistID1]: [
            {id: v1(), title: 'Milk', inBacket: true},
            {id: v1(), title: 'Bear', inBacket: false},
            {id: v1(), title: 'Book', inBacket: false},
        ]
    })

    const [filter, setFilter] = useState<FilterType>('all')

    function addGood(title: string) {
        const newGood = {id: v1(), title, inBacket: false};
        setGoods([newGood, ...goods]);
    }

    function deleteGood(goodID: string) {
        setGoods(goods.filter(g => g.id !== goodID))
    }

    function changeGoodStatus(goodID: string, checked: boolean) {
        setGoods(goods.map(g => g.id === goodID ? {...g, inBacket: checked} : g))
    }

    function filterGoods(goods: GoodsType[], filterValue: FilterType) {
        switch (filterValue) {
            case 'need to buy':
                return goods.filter(g => !g.inBacket);
            case 'in basket':
                return goods.filter(g => g.inBacket);
            default:
                return goods;
        }
    }


    function changeGoodsFilter(filter: FilterType) {
        setFilter(filter);
    }

    const goodsForRender: GoodsType[] = filterGoods(goods, filter)

    return (
        <div className="App">
            <Shoplist
                title="shop today"
                goods={goodsForRender}
                addGood={addGood}
                deleteGood={deleteGood}
                changeGoodStatus={changeGoodStatus}
                changeGoodsFilter={changeGoodsFilter}
                filter={filter}
            />
        </div>
    )
}

export default App;
