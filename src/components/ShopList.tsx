import React, {FC} from 'react';
import {GoodType} from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import {CancelPresentation} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../redux/store';
import {addGoodAC} from '../redux/goods-reducer';
import {Good} from './Good';

export type FilterType = 'all' | 'active' | 'completed'

type PropsType = {
    shoplistID: string
    title: string
    changeFilterShoplist: (shoplistID: string, filter: FilterType) => void
    removeShoplist: (shoplistID: string) => void
    changeTitleShoplist: (shoplistID: string, newTitle: string) => void
    filter: FilterType
}


const ShopList: FC<PropsType> = (
    {
        shoplistID,
        title,
        changeFilterShoplist,
        removeShoplist,
        changeTitleShoplist,
        filter,

    }) => {

    const goods = useSelector<AppRootState, GoodType[]>(state => state.goods[shoplistID])
    const dispatch = useDispatch();

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
        return (
            <Good good={g} shoplistID={shoplistID}/>
        )
    })

    const addGoodCallBack = (newTitle: string) => {
        dispatch(addGoodAC(shoplistID, newTitle))
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
                <Button color="inherit" variant={filter === 'all' ? 'outlined' : 'text'} onClick={() => {
                    changeFilterShoplist(shoplistID, 'all')
                }}>All
                </Button>
                <Button color="primary" variant={filter === 'active' ? 'outlined' : 'text'} onClick={() => {
                    changeFilterShoplist(shoplistID, 'active')
                }}>Active
                </Button>
                <Button color="secondary" variant={filter === 'completed' ? 'outlined' : 'text'} onClick={() => {
                    changeFilterShoplist(shoplistID, 'completed')
                }}>Completed
                </Button>
            </div>
        </div>
    );
};

export default ShopList;