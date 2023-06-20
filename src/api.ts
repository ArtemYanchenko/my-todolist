import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})


export const todolistAPI = {
    getTodolists() {
      return instance.get('todo-lists');
    }
}

export const goodsAPI = {
    getGoods(id:string) {
        return instance.get(`todo-lists/${id}/tasks`)
    }
}