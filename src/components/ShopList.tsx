import React, {FC} from 'react';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import {CancelPresentation} from '@mui/icons-material';
import {addGoodAC} from '../bll/goods-reducer';
import {Good} from './Good';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {changeShoplistFilterAC, changeShoplistTitleAC, removeShoplistAC} from '../bll/shoplist-reducer';

export type FilterType = 'all' | 'active' | 'completed'
type ColorButtonType = 'inherit' | 'primary' | 'secondary'

type PropsType = {
    shoplistID: string
    title: string
    filter: FilterType
}


const ShopList: FC<PropsType> = (
    {
        shoplistID,
        title,
        filter,
    }) => {


    const goods = useAppSelector(state => state.goods[shoplistID])
    const dispatch = useAppDispatch()

    const changeTitleShoplist = (newTitle: string) => {
        dispatch(changeShoplistTitleAC(shoplistID, newTitle))
    }

    const changeFilterShoplist = (filter: FilterType) => {
        dispatch(changeShoplistFilterAC(shoplistID, filter))
    }

    const removeShoplist = () => {
        dispatch(removeShoplistAC(shoplistID))
    }


    let filteredGoods = goods;

    if (filter === 'active') {
        filteredGoods = goods.filter(g => !g.inBacket)
    }
    if (filter === 'completed') {
        filteredGoods = goods.filter(g => g.inBacket)
    }

debugger
    const mappedGoods = filteredGoods.map(g => {
        return (
            <Good key={g.id} goodId={g.id} shoplistID={shoplistID}/>
        )
    })

    const addGoodCallBack = (newTitle: string) => {
        dispatch(addGoodAC(shoplistID, newTitle))
    }


    const buttons: FilterType[] = ['all', 'active', 'completed']
    const colorsButton: ColorButtonType[] = ['inherit', 'primary', 'secondary']

    const mappedButtons = buttons.map((b, i) => {
        return (
            <Button key={i} color={colorsButton[i]} variant={filter === b ? 'outlined' : 'text'} onClick={() => {
                changeFilterShoplist(b)
            }}>{b}
            </Button>
        )
    })

    return (
        <div className={'Shoplist'}>
            <h3>
                <EditableSpan title={title} callBack={changeTitleShoplist}/>
                <IconButton onClick={removeShoplist}>
                    <CancelPresentation/>
                </IconButton>
            </h3>
            <AddItemForm callBack={addGoodCallBack}/>
            <div>
                {mappedGoods}
            </div>
            <div>
                {mappedButtons}
            </div>
        </div>
    );
};

export default ShopList;