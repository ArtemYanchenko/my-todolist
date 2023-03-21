import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    callBack:(title:string)=>void
}


const AddItemForm = (props:PropsType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState(false)
    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
        setError(false);
    }
    const addGoodHandler = () => {
        const trimmedTitle = newTitle.trim()
        trimmedTitle ?
            props.callBack(trimmedTitle)
        :
            setError(true);
        setNewTitle('');
    }

    const addGoodEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addGoodHandler();
        }
    }
    return (
        <div>
            <input className={error ? 'error' : ''} value={newTitle} onChange={changeInputHandler}
                   onKeyDown={addGoodEnterHandler}/>
            <button onClick={addGoodHandler}>+</button>
        </div>
    );
};

export default AddItemForm;