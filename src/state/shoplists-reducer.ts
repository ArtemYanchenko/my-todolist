import {FilterType, ShoplistType} from '../App';
import {v1} from 'uuid';




type removeShoplistAT = {
    type: 'REMOVE-SHOPLIST'
    shoplistID: string
}

type addShoplistAT = {
    type: 'ADD-SHOPLIST'
    title: string
}

type changeShoplistTitleAT = {
    type: 'CHANGE-SHOPLIST-TITLE'
    shoplistID: string
    title: string
}

type changeShoplistFilterAT = {
    type: 'CHANGE-SHOPLIST-FILTER'
    shoplistID:string
    filter:FilterType
}

type ActionType = removeShoplistAT | addShoplistAT | changeShoplistTitleAT | changeShoplistFilterAT

export const shoplistsReducer = (state: ShoplistType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-SHOPLIST':
            return state.filter(s => s.id !== action.shoplistID)
        case 'ADD-SHOPLIST':
            return [{id: v1(), title: action.title, filter: 'all'}, ...state]
        case 'CHANGE-SHOPLIST-TITLE':
            return state.map(s => s.id === action.shoplistID ? {...s, title: action.title} : s)
        case 'CHANGE-SHOPLIST-FILTER':
            return state.map(s => s.id === action.shoplistID ? {...s, filter: action.filter} : s)
        default:
            return state;
    }
}


export const removeShoplistAC = (shoplistID: string): removeShoplistAT => {
    return {type: 'REMOVE-SHOPLIST', shoplistID: shoplistID}
}


export const addShoplistAC = (title: string): addShoplistAT => {
    return {type: 'ADD-SHOPLIST', title:title}
}

export const changeShoplistTitleAC = (shoplistID:string,title: string): changeShoplistTitleAT => {
    return {type: 'CHANGE-SHOPLIST-TITLE', shoplistID, title}
}

export const changeShoplistFilterAC = (shoplistID:string,filter:FilterType): changeShoplistFilterAT => {
    return {type: 'CHANGE-SHOPLIST-FILTER', shoplistID, filter}
}