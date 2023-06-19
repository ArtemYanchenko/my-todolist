import {v1} from 'uuid';
import {ShoplistType} from '../App';
import {FilterType} from '../components/ShopList';

type AddShoplistActionType = {
    type: 'ADD-SHOPLIST'
    newTitle: string
}

type ChangeShoplistTitleType = {
    type: 'CHANGE-SHOPLIST-TITLE'
    shoplistID: string
    newTitle: string
}

type ChangeShoplistFilterType = {
    type: 'CHANGE-SHOPLIST-FILTER'
    shoplistID: string
    newFilter: FilterType
}

type RemoveShoplistType = {
    type: 'REMOVE-SHOPLIST',
    shoplistID:string
}

export const shoplistsReducer = (state: Array<ShoplistType>, action: any) => {
    switch (action.type) {
        case'ADD-SHOPLIST': {
            const newId = v1();
            const newShoplist: ShoplistType = {id: newId, title: action.newTitle, filter: 'all'}
            return [newShoplist, ...state]
        }
        case 'CHANGE-SHOPLIST-TITLE': {
            return state.map(s => s.id === action.shoplistID ? {...s, title: action.newTitle} : s)
        }
        case 'CHANGE-SHOPLIST-FILTER': {
            return state.map(s => s.id === action.shoplistID ? {...s, filter: action.newFilter} : s)
        }
        case 'REMOVE-SHOPLIST': {
            return state.filter(s => s.id !== action.shoplistID)
        }
        default:
            return state
    }
}


const addShoplistAC = (newTitle: string): AddShoplistActionType => {
    return {
        type: 'ADD-SHOPLIST',
        newTitle
    } as const
}

const changeShoplistTitleAC = (shoplistID: string, newTitle: string): ChangeShoplistTitleType => {
    return {
        type: 'CHANGE-SHOPLIST-TITLE',
        shoplistID,
        newTitle
    }
}

const changeShoplistFilterAC = (shoplistID: string, newFilter: FilterType): ChangeShoplistFilterType => {
    return {
        type: 'CHANGE-SHOPLIST-FILTER',
        shoplistID,
        newFilter
    }
}

const removeShoplistAC = (shoplistID: string): RemoveShoplistType => {
    return {
        type: 'REMOVE-SHOPLIST',
        shoplistID
    }
}