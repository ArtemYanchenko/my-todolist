import {v1} from 'uuid';
import {ShoplistType} from '../App';
import {FilterType} from '../components/ShopList';

export type ShoplistsActionsType =
    AddShoplistACType
    | ChangeShoplistTitleACType
    | ChangeShoplistFilterACType
    | RemoveShoplistACType


export let shoplistID1 = v1()
export let shoplistID2 = v1()

const initialState: Array<ShoplistType> = [
    {id: shoplistID1, title: 'buy today', filter: 'all'},
    {id: shoplistID2, title: 'buy tomorrow', filter: 'all'},
]

export const shoplistsReducer = (state: ShoplistType[] = initialState, action: ShoplistsActionsType): Array<ShoplistType> => {
    switch (action.type) {
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