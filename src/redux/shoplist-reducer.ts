import {v1} from 'uuid';
import {ShoplistType} from '../App';

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
            return state.map(s => s.id === action.shoplistID ? {...s, filter:action.newFilter} : s)
        }
        case 'REMOVE-SHOPLIST': {
            return state.filter(s => s.id !== action.shoplistID)
        }
        default:
            return state
    }
}
