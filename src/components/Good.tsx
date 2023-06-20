import React, {ChangeEvent, FC} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import EditableSpan from './EditableSpan';
import {DoNotDisturbOn} from '@mui/icons-material';
import {changeGoodStatusAC, changeGoodTitleAC, removeGoodAC} from '../bll/goods-reducer';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';

type PropsType = {
    shoplistID:string,
    goodId:string
}

export const Good:FC<PropsType> = ({shoplistID,goodId}) => {
    const good = useAppSelector(state => state.goods[shoplistID].filter(el=>el.id === goodId)[0])
    const dispatch = useAppDispatch()
debugger
    const removeGood = () => {
        dispatch(removeGoodAC(shoplistID, good.id))
    }
    const onChangeGoodStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeGoodStatusAC(shoplistID, good.id, e.currentTarget.checked));
    }
    const changeTitleGood = (newTitle: string) => {
        dispatch(changeGoodTitleAC(shoplistID, good.id, newTitle));
    }
    return (
        <div className={good.inBacket ? 'goodInBacket' : ''} key={good.id}>
            <Checkbox checked={good.inBacket} color="primary" onChange={onChangeGoodStatus}/>
            <EditableSpan title={good.title} callBack={changeTitleGood}/>
            <IconButton onClick={removeGood}>
                <DoNotDisturbOn/>
            </IconButton>
        </div>
    );
};