import React, {useState} from 'react';
import './App.css';
import TodoList, {FilterType, TasksType} from './Components/TodoList';
import {v1} from 'uuid';


function App() {
    const [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'React', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    function removeTask(id: string) {
        let removingTask = tasks.filter((t) => t.id !== id);
        setTasks(removingTask);
    }

    function addTask(taskTitle: string) {
        let newTask = {id: v1(), title: taskTitle, isDone: false};
        setTasks([newTask, ...tasks])
    }

    function changeTaskStatus(id: string, checked: boolean) {
        let task = tasks.find((t) => t.id === id);
        if (task) {
            task.isDone = checked;
            setTasks([...tasks])
        }

    }

    let filteredTasks = tasks;

    if (filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }

    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }


    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      setFilter={setFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}/>
        </div>

    );
}

export default App;
