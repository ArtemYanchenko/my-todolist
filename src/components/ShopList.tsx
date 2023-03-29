import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {GoodType} from '../App';
import AddItemForm from './AddItemForm';

export type FilterType = 'all' | 'active' | 'completed'

type PropsType = {
    shoplistID: string
    title: string
    goods: GoodType[]
    addGood: (shoplistID:string, newTitle: string) => void
    removeGood: (shoplistID:string,goodID: string) => void
    changeGoodStatus: (shoplistID:string,goodID: string, newValue: boolean) => void
    changeFilterShoplist: (shoplistID: string, filter: FilterType) => void
    removeShoplist:(shoplistID:string)=>void
    filter: FilterType
}


const ShopList: FC<PropsType> = (
    {
        shoplistID,
        title,
        goods,
        addGood,
        removeGood,
        changeGoodStatus,
        changeFilterShoplist,
        removeShoplist,
        filter,

    }) => {


    let filteredGoods = goods;

    if (filter === 'active') {
        filteredGoods = goods.filter(g => !g.inBacket)
    }
    if (filter === 'completed') {
        filteredGoods = goods.filter(g => g.inBacket)
    }


    const removeShoplistHandler = () => {
        removeShoplist(shoplistID);
    }

    const mappedGoods = filteredGoods.map(g => {
        const removeGoodHandler = () => {
            removeGood(shoplistID,g.id)
        }

        const onChangeGoodStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeGoodStatus(shoplistID,g.id, e.currentTarget.checked);
        }
        return (
            <li key={g.id}>
                <input type="checkbox" checked={g.inBacket} onChange={onChangeGoodStatusHandler}/>
                <span className={g.inBacket ? 'goodInBacket' : ''}>{g.title}</span>
                <button onClick={removeGoodHandler}>X</button>
            </li>
        )
    })

    const addGoodCallBack = (newTitle:string) => {
        addGood(shoplistID,newTitle)
    }

    return (
        <div className={'Shoplist'}>
            <h3>
                {title}
                <button onClick={removeShoplistHandler}>x</button>
            </h3>
            <AddItemForm callBack={addGoodCallBack}/>
            <ul>
                {mappedGoods}
            </ul>
            <div>
                <button className={filter === 'all' ? 'btnActive' : ''} onClick={() => {
                    changeFilterShoplist(shoplistID, 'all')
                }}>All
                </button>
                <button className={filter === 'active' ? 'btnActive' : ''} onClick={() => {
                    changeFilterShoplist(shoplistID,'active')
                }}>Active
                </button>
                <button className={filter === 'completed' ? 'btnActive' : ''} onClick={() => {
                    changeFilterShoplist(shoplistID,'completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
};

export default ShopList;