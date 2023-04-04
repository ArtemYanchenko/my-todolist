import {v1} from 'uuid';
import {GoodsType, GoodType, ShoplistType} from '../App';
import {FilterType} from '../components/ShopList';

type AddGoodActionType = {
    type: 'ADD-GOOD'
    shoplistID: string
    newTitle: string
}

type RemoveGoodActionType = {
    type: 'REMOVE-GOOD'
    shoplistID: string
    goodID: string
}

type ChangeGoodStatus = {
    type: 'CHANGE-GOOD-STATUS'
    shoplistID: string
    goodID: string
    newValue: boolean
}

export type ActionsType = AddGoodActionType | RemoveGoodActionType | ChangeGoodStatus

export const goodsReducer = (state: GoodsType, action: ActionsType) => {
    switch (action.type) {
        case'ADD-GOOD':
            const newGood: GoodType = {id: v1(), title: action.newTitle, inBacket: false}
            return {...state, [action.shoplistID]: [newGood, ...state[action.shoplistID]]};
        case 'REMOVE-GOOD':
            return {...state, [action.shoplistID]: state[action.shoplistID].filter(s => s.id !== action.goodID)}
        case 'CHANGE-GOOD-STATUS':
            return {
                ...state,
                [action.shoplistID]: state[action.shoplistID].map(g => g.id === action.goodID ? {
                    ...g,
                    filter: action.newValue
                } : g)
            }
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


export const removeGoodAC = (shoplistID: string, goodID: string): RemoveGoodActionType => {
    return {
        type: 'REMOVE-GOOD',
        shoplistID,
        goodID
    } as const
}


export const changeGoodStatus = (shoplistID: string, goodID: string, newValue: boolean) => {
    return {
        type: 'CHANGE-GOOD-STATUS',
        shoplistID,
        goodID,
        newValue
    } as const
}