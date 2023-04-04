import React, {ChangeEvent, FC} from 'react';
import {GoodType} from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {CancelPresentation, DoNotDisturbOn} from '@mui/icons-material';

export type FilterType = 'all' | 'active' | 'completed'

type PropsType = {
    shoplistID: string
    title: string
    goods: GoodType[]
    addGood: (shoplistID: string, newTitle: string) => void
    removeGood: (shoplistID: string, goodID: string) => void
    changeGoodStatus: (shoplistID: string, goodID: string, newValue: boolean) => void
    changeFilterShoplist: (shoplistID: string, filter: FilterType) => void
    removeShoplist: (shoplistID: string) => void
    changeTitleGood: (shoplistID: string, goodID: string, newTitle: string) => void
    changeTitleShoplist: (shoplistID: string, newTitle: string) => void
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
        changeTitleGood,
        changeTitleShoplist,
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
            removeGood(shoplistID, g.id)
        }
        const onChangeGoodStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeGoodStatus(shoplistID, g.id, e.currentTarget.checked);
        }
        const changeTitleGoodHandler = (newTitle: string) => {
            changeTitleGood(shoplistID, g.id, newTitle);
        }

        return (
            <div className={g.inBacket ? 'goodInBacket' : ''} key={g.id}>
                <Checkbox checked={g.inBacket} color="primary" onChange={onChangeGoodStatusHandler}/>
                <EditableSpan title={g.title} callBack={changeTitleGoodHandler}/>
                <IconButton onClick={removeGoodHandler}>
                    <DoNotDisturbOn/>
                </IconButton>
            </div>
        )
    })

    const addGoodCallBack = (newTitle: string) => {
        addGood(shoplistID, newTitle)
    }

    const changeShoplistTitleHandler = (newTitle: string) => {
        changeTitleShoplist(shoplistID, newTitle)
    }

    return (
        <div className={'Shoplist'}>
            <h3>
                <EditableSpan title={title} callBack={changeShoplistTitleHandler}/>
                <IconButton onClick={removeShoplistHandler}>
                    <CancelPresentation/>
                </IconButton>
            </h3>
            <AddItemForm callBack={addGoodCallBack}/>
            <div>
                {mappedGoods}
            </div>
            <div>
                <Button color='inherit' variant={filter === 'all' ? 'outlined' : 'text'} onClick={() => {
                    changeFilterShoplist(shoplistID, 'all')
                }}>All
                </Button>
                <Button color='primary' variant={filter === 'active' ? 'outlined' : 'text'} onClick={() => {
                    changeFilterShoplist(shoplistID, 'active')
                }}>Active
                </Button>
                <Button color='secondary' variant={filter === 'completed' ? 'outlined' : 'text'} onClick={() => {
                    changeFilterShoplist(shoplistID, 'completed')
                }}>Completed
                </Button>
            </div>
        </div>
    );
};

export default ShopList;