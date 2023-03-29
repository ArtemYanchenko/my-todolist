import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {GoodType} from '../App';

type FilterType = 'all' | 'active' | 'completed'

type PropsType = {
    title: string
    goods: GoodType[]
    removeGood: (goodID: string) => void
    addGood: (newTitle: string) => void
    changeGoodStatus: (goodID: string, newValue: boolean) => void
}


const ShopList: FC<PropsType> = (
    {
        title,
        goods,
        removeGood,
        addGood,
        changeGoodStatus,
    }) => {
    const [filter, setFilter] = useState<FilterType>('all')
    const [newTitle, setNewTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onClickFilterFandler = (filterValue: FilterType) => {
        setFilter(filterValue)
    }


    let filteredGoods = goods;

    if (filter === 'active') {
        filteredGoods = goods.filter(g => !g.inBacket)
    }

    if (filter === 'completed') {
        filteredGoods = goods.filter(g => g.inBacket)
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
        setError(false);
    }
    const addGoodHandler = () => {
        if (newTitle.trim()) {
            addGood(newTitle.trim());
            setNewTitle('');
        } else (
            setError(true)
        )
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addGoodHandler();
        }
    }

    const mappedGoods = filteredGoods.map(g => {
        const removeGoodHandler = () => {
            removeGood(g.id)
        }

        const onChangeGoodStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeGoodStatus(g.id, e.currentTarget.checked);
        }
        return (
            <li key={g.id}>
                <input type="checkbox" checked={g.inBacket} onChange={onChangeGoodStatusHandler}/>
                <span className={g.inBacket ? 'goodInBacket' : ''} >{g.title}</span>
                <button onClick={removeGoodHandler}>X</button>
            </li>
        )
    })

    return (
        <div className={'Shoplist'}>
            <h3>{title}</h3>
            <div>
                <input className={error ? 'errorInput' : ''}
                       value={newTitle}
                       onChange={onChangeInputHandler}
                       onKeyDown={onKeyDownHandler}/>
                <button onClick={addGoodHandler}>+</button>
            </div>
            <div className={'errorMessage'}>{error ? <span>title is required!!!</span> : ''}</div>
            <ul>
                {mappedGoods}
            </ul>
            <div>
                <button className={filter === 'all' ? 'btnActive' : ''} onClick={() => {
                    onClickFilterFandler('all')
                }}>All
                </button>
                <button className={filter === 'active' ? 'btnActive' : ''} onClick={() => {
                    onClickFilterFandler('active')
                }}>Active
                </button>
                <button className={filter === 'completed' ? 'btnActive' : ''} onClick={() => {
                    onClickFilterFandler('completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
};

export default ShopList;