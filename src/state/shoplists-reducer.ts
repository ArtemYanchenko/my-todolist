import {ShoplistType} from '../App';
import {v1} from 'uuid';


type ActionType = {
    type: string
    [key: string]: any
}

export const shoplistsReducer = (state: ShoplistType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-SHOPLIST':
            return state.filter(s => s.id !== action.id)
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