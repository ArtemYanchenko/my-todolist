import React, {ChangeEvent, FC, useState} from 'react';

type PropsType = {
    title: string
    callBack: (newTitle: string) => void
}

const EditableSpan: FC<PropsType> = (
    {
        title,
        callBack,
    }) => {

    const [newTitle, setNewTitle] = useState(title)
    const [editMode, setEditMode] = useState(false)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }

    const onBlurHandler = () => {
        setEditMode(false);
        callBack(newTitle);
    }

    return (
        <>
            {editMode
                ? <input type="text" autoFocus value={newTitle} onChange={onChangeInputHandler} onBlur={onBlurHandler}/>
                : <span onDoubleClick={() => setEditMode(true)}>{title}</span>
            }
        </>
    );
};

export default EditableSpan;