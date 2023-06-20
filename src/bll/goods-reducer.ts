import {v1} from 'uuid';
import {GoodsType, GoodType} from '../App';
import {AddShoplistACType, RemoveShoplistACType} from './shoplist-reducer';

export type GoodsActionsType =
    AddShoplistACType
    | AddGoodACType
    | ChangeGoodStatusACType
    | ChangeGoodTitleACType
    | RemoveGoodACType
    | RemoveShoplistACType
| SetGoodsType


const initialState:GoodsType = {}

export const goodsReducer = (state = initialState, action: GoodsActionsType): GoodsType => {
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
        case 'SET-GOODS': {
            return {...state,[action.payload.shoplistsId]:[...state[action.payload.shoplistsId],...action.payload.goods]}
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

export type SetGoodsType = ReturnType<typeof setGoods>
export const setGoods = (shoplistsId:string,goods:any) => ({type:'SET-GOODS',payload:{shoplistsId,goods}} as const)