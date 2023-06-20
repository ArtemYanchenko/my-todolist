import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})


export const todolistAPI = {
    getTodolists() {
        return instance.get('todo-lists');
    },
    addTodo(newTitle: string) {
        return instance.post('todo-lists', {title: newTitle})
    },
    changeTodoTitle(id:string,newTitle:string) {
        return instance.put(`todo-lists/${id}`,{title:newTitle})
    },
    removeTodo(id: string) {
        return instance.delete(`todo-lists/${id}`)
    }
}

export const goodsAPI = {
    getGoods(id: string) {
        return instance.get(`todo-lists/${id}/tasks`)
    },
    addGood(id:string,newTitle:string){
        return instance.post(`todo-lists/${id}/tasks`,{title:newTitle})
    }
}