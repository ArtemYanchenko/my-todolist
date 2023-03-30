import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {Button, IconButton, Input, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';

type PropsType = {
    callBack: (newTitle: string) => void
}

const AddItemForm: FC<PropsType> = (
    {
        callBack,
    }) => {
    const [error, setError] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>('')


    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
        setError(false);
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addGoodHandler();
        }
    }

    const addGoodHandler = () => {
        if (newTitle.trim()) {
            callBack(newTitle.trim());
            setNewTitle('');
        } else (
            setError(true)
        )
    }

    return (
        <div>
            <TextField variant="outlined"
                       error={!!error}
                       value={newTitle}
                       onChange={onChangeInputHandler}
                       onKeyDown={onKeyDownHandler}
                       label="Enter text"
                       helperText={error}
            />
            <IconButton onClick={addGoodHandler}>
                <AddBox/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;