import React, {ChangeEvent, FC} from 'react';
import {GoodType} from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {CancelPresentation, DoNotDisturbOn} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../redux/store';
import {addGoodAC, changeGoodStatusAC, changeGoodTitleAC, removeGoodAC} from '../redux/goods-reducer';

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

    const goods = useSelector<AppRootState,GoodType[]>(state => state.goods[shoplistID])
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
        const removeGoodHandler = () => {
            dispatch(removeGoodAC(shoplistID, g.id))
        }
        const onChangeGoodStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeGoodStatusAC(shoplistID, g.id, e.currentTarget.checked));
        }
        const changeTitleGoodHandler = (newTitle: string) => {
            dispatch(changeGoodTitleAC(shoplistID, g.id, newTitle));
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