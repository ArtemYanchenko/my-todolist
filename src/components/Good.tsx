import React, {ChangeEvent, FC} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import EditableSpan from './EditableSpan';
import {DoNotDisturbOn} from '@mui/icons-material';
import {changeGoodStatusAC, changeGoodTitleAC, removeGoodAC} from '../redux/goods-reducer';
import {useDispatch} from 'react-redux';
import {GoodType} from '../App';

type PropsType = {
    shoplistID:string,
    good:GoodType
}

export const Good:FC<PropsType> = ({shoplistID,good}) => {

    const dispatch = useDispatch()

    const removeGoodHandler = () => {
        dispatch(removeGoodAC(shoplistID, good.id))
    }
    const onChangeGoodStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeGoodStatusAC(shoplistID, good.id, e.currentTarget.checked));
    }
    const changeTitleGoodHandler = (newTitle: string) => {
        dispatch(changeGoodTitleAC(shoplistID, good.id, newTitle));
    }
    return (
        <div className={good.inBacket ? 'goodInBacket' : ''} key={good.id}>
            <Checkbox checked={good.inBacket} color="primary" onChange={onChangeGoodStatusHandler}/>
            <EditableSpan title={good.title} callBack={changeTitleGoodHandler}/>
            <IconButton onClick={removeGoodHandler}>
                <DoNotDisturbOn/>
            </IconButton>
        </div>
    );
};
