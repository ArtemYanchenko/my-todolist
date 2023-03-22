import {FilterType, ShoplistType} from '../App';
import {v1} from 'uuid';




type removeShoplistAC = {
    type: 'REMOVE-SHOPLIST'
    shoplistID: string
}

type addShoplistAC = {
    type: 'ADD-SHOPLIST'
    title: string
}

type changeShoplistTitle = {
    type: 'CHANGE-SHOPLIST-TITLE'
    shoplistID: string
    title: string
}

type changeShoplistFilter = {
    type: 'CHANGE-SHOPLIST-FILTER'
    shoplistID:string
    filter:FilterType
}

type ActionType = removeShoplistAC | addShoplistAC | changeShoplistTitle | changeShoplistFilter

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