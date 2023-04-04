import {v1} from 'uuid';
import {GoodsType, GoodType} from '../App';

type AddGoodActionType = {
    type: 'ADD-GOOD'
    shoplistID: string
    newTitle: string
}

type ChangeGoodStatusActionType = {
    type: 'CHANGE-GOOD-STATUS'
    shoplistID: string
    goodID: string
    newValue: boolean
}

type ChangeGoodTitleActionType = {
    type: 'CHANGE-GOOD-TITLE'
    shoplistID: string
    goodID: string
    newTitle: string
}

type RemoveGoodActionType = {
    type: 'REMOVE-GOOD'
    shoplistID: string
    goodID: string
}

export type ActionsType = AddGoodActionType | ChangeGoodStatusActionType | ChangeGoodTitleActionType | RemoveGoodActionType

export const goodsReducer = (state: GoodsType, action: ActionsType) => {
    switch (action.type) {
        case'ADD-GOOD':
            const newGood: GoodType = {id: v1(), title: action.newTitle, inBacket: false}
            return {...state, [action.shoplistID]: [newGood, ...state[action.shoplistID]]};
        case 'CHANGE-GOOD-STATUS':
            return {
                ...state,
                [action.shoplistID]: state[action.shoplistID].map(g => g.id === action.goodID ? {
                    ...g,
                    filter: action.newValue
                } : g)
            }
        case 'CHANGE-GOOD-TITLE':
            return {...state,
                [action.shoplistID]: state[action.shoplistID].map(s => s.id === action.goodID ? {
                    ...s,
                    title: action.newTitle
                } : s)
            }
        case 'REMOVE-GOOD':
            return {...state, [action.shoplistID]: state[action.shoplistID].filter(s => s.id !== action.goodID)}
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


export const changeGoodStatusAC = (shoplistID: string, goodID: string, newValue: boolean):ChangeGoodStatusActionType => {
    return {
        type: 'CHANGE-GOOD-STATUS',
        shoplistID,
        goodID,
        newValue
    } as const
}


export const changeGoodTitleAC = (shoplistID: string, goodID: string, newTitle: string):ChangeGoodTitleActionType => {
    return {
        type: 'CHANGE-GOOD-TITLE',
        shoplistID,
        goodID,
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
