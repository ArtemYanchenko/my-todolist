import React, {FC, useState} from 'react';
import {GoodType} from '../App';


type FilterType = 'all' | 'active' | 'completed'

type PropsType = {
    title: string
    goods: GoodType[]
    removeGood:(goodID:string)=>void
}


const ShopList: FC<PropsType> = (
    {
        title,
        goods,
        removeGood
    }) => {
    const [filter,setFilter] = useState<FilterType>('all')


    const onClickFilterFandler = (filterValue:FilterType) => {
        setFilter(filterValue)
    }


    let filteredGoods = goods;

    if (filter === 'active') {
        filteredGoods = goods.filter(g=>!g.inBacket)
    }

    if (filter === 'completed') {
        filteredGoods = goods.filter(g=>g.inBacket)
    }



    return (
        <div className={'Shoplist'}>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {filteredGoods.map(g => {
                    const removeGoodHandler = () => {
                        removeGood(g.id)
                    }
                    return (
                        <li key={g.id}>
                            <input type="checkbox" checked={g.inBacket}/> <span>{g.title}</span>
                            <button onClick={removeGoodHandler}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={()=>{onClickFilterFandler('all')}}>All</button>
                <button onClick={()=>{onClickFilterFandler('active')}}>Active</button>
                <button onClick={()=>{onClickFilterFandler('completed')}}>Completed</button>
            </div>
        </div>
    );
};

export default ShopList;