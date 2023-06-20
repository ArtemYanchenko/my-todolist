import {v1} from 'uuid';
import {ShoplistType} from '../App';
import {FilterType} from '../components/ShopList';
import {Dispatch} from 'react';
import {todolistAPI} from '../api';

export type ShoplistsActionsType =
    AddShoplistACType
    | ChangeShoplistTitleACType
    | ChangeShoplistFilterACType
    | RemoveShoplistACType
    | ReturnType<typeof setShoplistAC>

const initialState: ShoplistType[] = []

type ShoplistsApiType ={
    id: string
    addedDate: string
    order: number
    title: string
}

export const shoplistsReducer = (state = initialState, action: ShoplistsActionsType): ShoplistType[] => {
    switch (action.type) {
        case 'SET-SHOPLISTS':{
            // @ts-ignore
            return [...state,...action.payload.shoplists.map(el=>({...el,filter:'all',goods:[]}))]
        }
        case'ADD-SHOPLIST': {
            const newShoplist: ShoplistType = {id: action.payload.shoplistId, title: action.payload.newTitle, filter: 'all'}
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

export type AddShoplistACType = ReturnType<typeof addShoplistAC>
export const addShoplistAC = (newTitle: string) => {
    return {
        type: 'ADD-SHOPLIST',
        payload: {
            newTitle,
            shoplistId: v1()
        }
    } as const
}

type ChangeShoplistTitleACType = ReturnType<typeof changeShoplistTitleAC>
export const changeShoplistTitleAC = (shoplistID: string, newTitle: string) => {
    return {
        type: 'CHANGE-SHOPLIST-TITLE',
        payload: {
            shoplistID,
            newTitle
        }
    } as const
}


type ChangeShoplistFilterACType = ReturnType<typeof changeShoplistFilterAC>
export const changeShoplistFilterAC = (shoplistID: string, newFilter: FilterType) => {
    return {
        type: 'CHANGE-SHOPLIST-FILTER',
        payload: {
            shoplistID,
            newFilter
        }
    } as const
}

export type RemoveShoplistACType = ReturnType<typeof removeShoplistAC>
export const removeShoplistAC = (shoplistID: string) => {
    return {
        type: 'REMOVE-SHOPLIST',
        payload: {
            shoplistID
        }
    } as const
}


const setShoplistAC = (shoplists:ShoplistsApiType[])=>({type:'SET-SHOPLISTS',payload:{shoplists}} as const)


export const getTodosTC = () => (dispatch:Dispatch<any>) => {
    todolistAPI.getTodolists()
        .then(res=>{
            dispatch(setShoplistAC(res.data))
        })
}