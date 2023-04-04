import {v1} from 'uuid';
import {GoodsType, GoodType, ShoplistType} from '../App';
import {FilterType} from '../components/ShopList';

type AddGoodActionType = {
    type: 'ADD-GOOD'
    shoplistID: string
    newTitle: string
}

type RemoveGoodActionType = {
    type:'REMOVE-GOOD'
    shoplistID:string
    goodID:string
}

export type ActionsType = AddGoodActionType | RemoveGoodActionType

export const goodsReducer = (state: GoodsType, action: ActionsType) => {
    switch (action.type) {
        case'ADD-GOOD':
            const newGood: GoodType = {id: v1(), title: action.newTitle, inBacket: false}
            return {...state, [action.shoplistID]: [newGood, ...state[action.shoplistID]]};
        case 'REMOVE-GOOD':
            return {...state,[action.shoplistID]:state[action.shoplistID].filter(s=>s.id !== action.goodID)}
        default:
            return state;
    }
}


export const addGoodAC = (shoplistID: string, newTitle: string): AddGoodActionType => {
    return {
        type: 'ADD-GOOD',
        shoplistID,
        newTitle
    } as const
}


export const removeGoodAC = (shoplistID: string, goodID: string):RemoveGoodActionType=>{
    return {
        type:'REMOVE-GOOD',
        shoplistID,
        goodID
    } as const
}