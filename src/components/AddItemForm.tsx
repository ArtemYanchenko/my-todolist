import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

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
            <input className={error ? 'errorInput' : ''}
                   value={newTitle}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyDownHandler}/>
            <button onClick={addGoodHandler}>+</button>
            <div className={'errorMessage'}>{error ? <span>title is required!!!</span> : ''}</div>
        </div>
    );
};

export default AddItemForm;