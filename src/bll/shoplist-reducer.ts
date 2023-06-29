import {v1} from 'uuid';
import {FilterType} from '../components/ShopList';
import {todolistAPI} from '../api';
import {getGoodsTC} from './goods-reducer';
import {AppThunkType} from './store';

const initialState: ShoplistDomainType[] = []

export const shoplistsReducer = (state = initialState, action: ShoplistsActionsType): ShoplistDomainType[] => {
    switch (action.type) {
        case 'SET-SHOPLISTS': {
            return action.payload.shoplists.map(el => ({...el, filter: 'all'}))
        }
        case'ADD-SHOPLIST': {
            const newShoplist: ShoplistDomainType = {
                id: action.payload.shoplistId,
                title: action.payload.newTitle,
                filter: 'all',
                addedDate: '',
                order: 0
            }
            return [newShoplist, ...state]
        }
        case 'CHANGE-SHOPLIST-TITLE': {
            return state.map(s => s.id === action.payload.shoplistID ? {...s, title: action.payload.newTitle} : s)
        }
        case 'CHANGE-SHOPLIST-FILTER': {
            return state.map(s => s.id === action.payload.shoplistID ? {...s, filter: action.payload.newFilter} : s)
        }
        case 'REMOVE-SHOPLIST': {
            return state.filter(s => s.id !== action.payload.shoplistID)
        }
        default:
            return state
    }
}

//actions
export const addShoplistAC = (newTitle: string) => {
    return {
        type: 'ADD-SHOPLIST',
        payload: {
            newTitle,
            shoplistId: v1()
        }
    } as const
}


export const changeShoplistTitleAC = (shoplistID: string, newTitle: string) => ({
    type: 'CHANGE-SHOPLIST-TITLE',
    payload: {
        shoplistID,
        newTitle
    }
} as const)

export const changeShoplistFilterAC = (shoplistID: string, newFilter: FilterType) => ({
    type: 'CHANGE-SHOPLIST-FILTER',
    payload: {
        shoplistID,
        newFilter
    }
} as const)

export const removeShoplistAC = (shoplistID: string) => ({
    type: 'REMOVE-SHOPLIST',
    payload: {
        shoplistID
    }
} as const)

export const setShoplistAC = (shoplists: ShoplistsApiType[]) => ({
    type: 'SET-SHOPLISTS', payload: {shoplists}
} as const)

//thunks
export const getTodosTC = (): AppThunkType => (dispatch) => {
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setShoplistAC(res.data))
            return res.data
        })
        .then((todos: ShoplistDomainType[]) => {
            todos.forEach((tl) => {
                dispatch(getGoodsTC(tl.id))
            })
        })
}

export const addTodosTC = (newTitle: string): AppThunkType => (dispatch) => {
    todolistAPI.addTodo(newTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addShoplistAC(newTitle))
            }
        })
}

export const changeTodoTitleTC = (id: string, newTitle: string): AppThunkType => (dispatch) => {
    todolistAPI.changeTodoTitle(id, newTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeShoplistTitleAC(id, newTitle))
            }
        })
}

export const removeTodoTC = (id: string): AppThunkType => (dispatch) => {
    todolistAPI.removeTodo(id)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeShoplistAC(id))
            }
        })
}

//types
export type ShoplistsActionsType =
    | AddShoplistACType
    | ReturnType<typeof changeShoplistTitleAC>
    | ReturnType<typeof changeShoplistFilterAC>
    | RemoveShoplistACType
    | SetShoplistACType

export type AddShoplistACType = ReturnType<typeof addShoplistAC>
export type RemoveShoplistACType = ReturnType<typeof removeShoplistAC>
export type SetShoplistACType = ReturnType<typeof setShoplistAC>

type ShoplistsApiType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ShoplistDomainType = ShoplistsApiType & {
    filter: FilterType
}