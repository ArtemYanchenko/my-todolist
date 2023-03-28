import React, {FC} from 'react';
import {GoodType} from '../App';

type PropsType = {
    title: string
    goods: GoodType[]
}


const ShopList: FC<PropsType> = (
    {
        title,
        goods
    }) => {
    return (
        <div className={'Shoplist'}>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {goods.map(g => {
                    return (
                        <li key={g.id}>
                            <input type="checkbox" checked={g.inBacket}/> <span>{g.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default ShopList;