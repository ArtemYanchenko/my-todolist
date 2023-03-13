import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type FilterType = 'all' | 'active' | 'completed'


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListPropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: string) => void
    setFilter: (filter: FilterType) => void
    addTask: (taskTitle: string) => void
    changeTaskStatus: (id: string, checked: boolean) => void
    filter: FilterType;
}


const TodoList = (props: TodoListPropsType) => {

    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>('')

    const tasksMaped = props.tasks.map(t => {
        const onClickButtonHandler = () => {
            props.removeTask(t.id)
        }
        const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        }

        return <li>
            <input type="checkbox" checked={t.isDone} onChange={onChangeInputHandler}/>
            <span>{t.title}</span>
            <button onClick={onClickButtonHandler}>X</button>
        </li>
    })

    const addTaskCallBack = () => {
        if (taskTitle.trim()) {
            props.addTask(taskTitle.trim());
            setTaskTitle('');
        } else {
            setError('Title is required !!!');
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError('')
    }
    const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskCallBack();
        }
    }

    const onClickAllButtonHandler = () => {
        props.setFilter('all')
    }
    const onClickActiveButtonHandler = () => {
        props.setFilter('active')
    }
    const onClickCompletedButtonHandler = () => {
        props.setFilter('completed')
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle} onChange={onChangeInputHandler} onKeyDown={onKeyDownInputHandler}
                       className={error ? 'errorInput' : ''}/>
                <button onClick={addTaskCallBack}>+</button>
                <div>{error ? <p className={'error'}>{error}</p> : ''}</div>

            </div>
            <ul>
                {tasksMaped}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active' : ''} onClick={onClickAllButtonHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active' : ''}
                        onClick={onClickActiveButtonHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active' : ''}
                        onClick={onClickCompletedButtonHandler}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;