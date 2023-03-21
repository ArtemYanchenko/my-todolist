import React, {useState} from 'react';
import './App.css';
import Shoplist from './components/Shoplist';
import {v1} from 'uuid';

export type GoodsType = {
    id: string
    title: string
    inBacket: boolean
}
export type FilterType = 'all' | 'need to buy' | 'in basket';

function App() {

    const [goods, setGoods] = useState<GoodsType[]>([
        {id: v1(), title: 'Milk', inBacket: true},
        {id: v1(), title: 'Bear', inBacket: false},
        {id: v1(), title: 'Book', inBacket: false},
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    function deleteGood(goodID: string) {
        setGoods(goods.filter(g => g.id !== goodID))
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

    const goodsForRender: GoodsType[] = filterGoods(goods, filter)

    return (
        <div className="App">
            <Shoplist
                title="shop today"
                goods={goodsForRender}
                deleteGood={deleteGood}
                setFilter={setFilter}
            />
        </div>
    )
}

export default App;
