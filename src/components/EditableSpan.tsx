import React, {ChangeEvent, useState} from 'react';


type PropsType = {
    title: string
    callBack:(titleValue:string)=>void
}
const EditableSpan = (props: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [titleValue, setTitleValue] = useState('')


    const activateEdit = () => {
        setEditMode(true)
        setTitleValue(props.title)
    }
    const disableEdit = () => {

        setEditMode(false);
        props.callBack(titleValue);
    }

    const onChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value);
    }

    return (
        <>
            {
                editMode
                    ? <input type="text" value={titleValue} autoFocus onBlur={disableEdit} onChange={onChangeInputHandler}/>
                    : <span
                            onDoubleClick={activateEdit}>{props.title}</span>
            }
        </>
    )
};

export default EditableSpan;