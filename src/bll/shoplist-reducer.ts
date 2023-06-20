import {v1} from 'uuid';
import {FilterType} from '../components/ShopList';
import {Dispatch} from 'redux';
import {todolistAPI} from '../api';
import {getGoodsTC} from './goods-reducer';
import {AppThunkType} from './store';

export type ShoplistsActionsType =
    AddShoplistACType
    | ChangeShoplistTitleACType
    | ChangeShoplistFilterACType
    | RemoveShoplistACType
    | SetShoplistACType

const initialState: ShoplistDomainType[] = []

type ShoplistsApiType ={
    id: string
    addedDate: string
    order: number
    title: string
}

export type ShoplistDomainType = ShoplistsApiType & {
    filter:FilterType
}

export const shoplistsReducer = (state = initialState, action: ShoplistsActionsType): ShoplistDomainType[] => {
    switch (action.type) {
        case 'SET-SHOPLISTS':{
            return action.payload.shoplists.map(el=>({...el,filter:'all'}))
        }
        case'ADD-SHOPLIST': {
            const newShoplist: ShoplistDomainType = {id: action.payload.shoplistId, title: action.payload.newTitle, filter: 'all', addedDate:'', order:0}
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

export type SetShoplistACType = ReturnType<typeof setShoplistAC>
export const setShoplistAC = (shoplists:ShoplistsApiType[])=>({type:'SET-SHOPLISTS',payload:{shoplists}} as const)


export const getTodosTC = ():AppThunkType => (dispatch) => {
    todolistAPI.getTodolists()
        .then(res=>{
            dispatch(setShoplistAC(res.data))
            return res.data
        })
        .then((todos)=>{
            todos.forEach((tl: { id: string; })=> {
                dispatch(getGoodsTC(tl.id))
            })
        })
}