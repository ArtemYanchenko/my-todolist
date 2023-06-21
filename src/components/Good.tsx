import React, {ChangeEvent, FC} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import EditableSpan from './EditableSpan';
import {DoNotDisturbOn} from '@mui/icons-material';
import {changeGoodTitleAC, removeGoodTC, TaskStatuses, updateGoodTC} from '../bll/goods-reducer';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';

type PropsType = {
    shoplistID:string,
    goodId:string
}

export const Good:FC<PropsType> = ({shoplistID,goodId}) => {
    const good = useAppSelector(state => state.goods[shoplistID].filter(el=>el.id === goodId)[0])
    const dispatch = useAppDispatch()

    const removeGood = () => {
        dispatch(removeGoodTC(shoplistID, good.id))
    }

    const onChangeGoodStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateGoodTC(shoplistID, good.id, {status}));
    }
    const changeTitleGood = (newTitle: string) => {
        dispatch(changeGoodTitleAC(shoplistID, good.id, newTitle));
    }
    return (
        <div className={good.status === TaskStatuses.Completed ? 'goodInBacket' : ''} key={good.id}>
            <Checkbox checked={good.status === TaskStatuses.Completed} color="primary" onChange={onChangeGoodStatus}/>
            <EditableSpan title={good.title} callBack={changeTitleGood}/>
            <IconButton onClick={removeGood}>
                <DoNotDisturbOn/>
            </IconButton>
        </div>
    );
};