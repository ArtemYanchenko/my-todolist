import {v1} from 'uuid';
import {GoodsType, GoodType} from '../App';
import {AddShoplistACType, RemoveShoplistACType, shoplistID1, shoplistID2} from './shoplist-reducer';
import {store} from './store';

export type GoodsActionsType =
    AddShoplistACType
    | AddGoodACType
    | ChangeGoodStatusACType
    | ChangeGoodTitleACType
    | RemoveGoodACType
    | RemoveShoplistACType


const initialState = {
    [shoplistID1]: [
        {id: v1(), title: 'Book - HTML&CSS', inBacket: true},
        {id: v1(), title: 'Book - JS', inBacket: true},
        {id: v1(), title: 'Book - ReactJS', inBacket: false},

    ],
    [shoplistID2]: [
        {id: v1(), title: 'Book - Rest API', inBacket: false},
        {id: v1(), title: 'Book - GraphQL', inBacket: false},
    ]
}

export const goodsReducer = (state: GoodsType = initialState, action: GoodsActionsType): GoodsType => {
    switch (action.type) {
        case 'ADD-GOOD':
            const newGood: GoodType = {id: v1(), title: action.payload.newTitle, inBacket: false}
            return {...state, [action.payload.shoplistID]: [newGood, ...state[action.payload.shoplistID]]};
        case 'CHANGE-GOOD-STATUS':
            return {
                ...state,
                [action.payload.shoplistID]: state[action.payload.shoplistID].map(g => g.id === action.payload.goodID ? {
                    ...g,
                    inBacket: action.payload.newValue
                } : g)
            }
        case 'CHANGE-GOOD-TITLE':
            return {
                ...state,
                [action.payload.shoplistID]: state[action.payload.shoplistID].map(s => s.id === action.payload.goodID ? {
                    ...s,
                    title: action.payload.newTitle
                } : s)
            }
        case 'REMOVE-GOOD':
            return {
                ...state,
                [action.payload.shoplistID]: state[action.payload.shoplistID].filter(s => s.id !== action.payload.goodID)
            }
        case 'ADD-SHOPLIST':
            return {...state, [action.payload.shoplistId]: []}
        case 'REMOVE-SHOPLIST':
            delete state[action.payload.shoplistID]
            return {...state};
        default:
            return state;
    }
}

type AddGoodACType = ReturnType<typeof addGoodAC>
export const addGoodAC = (shoplistID: string, newTitle: string) => {
    return {
        type: 'ADD-GOOD',
        payload: {
            shoplistID,
            newTitle
        }
    } as const
}

type ChangeGoodStatusACType = ReturnType<typeof changeGoodStatusAC>
export const changeGoodStatusAC = (shoplistID: string, goodID: string, newValue: boolean) => {
    return {
        type: 'CHANGE-GOOD-STATUS',
        payload: {
            shoplistID,
            goodID,
            newValue
        }
    } as const
}

type ChangeGoodTitleACType = ReturnType<typeof changeGoodTitleAC>
export const changeGoodTitleAC = (shoplistID: string, goodID: string, newTitle: string) => {
    return {
        type: 'CHANGE-GOOD-TITLE',
        payload: {
            shoplistID,
            goodID,
            newTitle
        }
    } as const
}

type RemoveGoodACType = ReturnType<typeof removeGoodAC>
export const removeGoodAC = (shoplistID: string, goodID: string) => {
    return {
        type: 'REMOVE-GOOD',
        payload: {
            shoplistID,
            goodID
        }
    } as const
}
