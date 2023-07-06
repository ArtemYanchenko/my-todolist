import React, {FC, useCallback} from 'react';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, IconButton} from '@mui/material';
import {CancelPresentation} from '@mui/icons-material';
import {addGoodTC, TaskStatuses, TaskTypeAPI} from '../bll/goods-reducer';
import {Good} from './Good';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {changeShoplistFilterAC, changeTodoTitleTC, removeTodoTC} from '../bll/shoplist-reducer';

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
        dispatch(changeTodoTitleTC(shoplistID, newTitle))
    }

    const changeFilterShoplist = (filter: FilterType) => {
        dispatch(changeShoplistFilterAC(shoplistID, filter))
    }

    const removeShoplist = () => {
        dispatch(removeTodoTC(shoplistID))
    }

    const filteredGoods = useCallback ((): TaskTypeAPI[]=> {
        if (filter === 'active') {
            return goods.filter(t => t.status === TaskStatuses.New);
        }
        if (filter === 'completed') {
            return goods.filter(t => t.status === TaskStatuses.Completed);
        }
        return goods
    },[filter]);

    let allTodolistTasks = filteredGoods();

    const mappedGoods = allTodolistTasks.map(g => {
        return (
            <Good key={g.id} goodId={g.id} shoplistID={shoplistID}/>
        )
    })

    const addGoodCallBack = (newTitle: string) => {
        dispatch(addGoodTC(shoplistID, newTitle))
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
                {filteredGoods().length === 0 && <b>Your tasks list is empty</b>}
            </div>
            <div>
                {mappedButtons}
            </div>
        </div>
    );
};

export default ShopList;