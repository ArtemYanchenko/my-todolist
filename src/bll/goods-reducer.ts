import {GoodsType} from '../App';
import {AddShoplistACType, RemoveShoplistACType, SetShoplistACType} from './shoplist-reducer';
import {goodsAPI} from '../api';
import {AppThunkType, RootState} from './store';

const initialState: GoodsType = {}

export const goodsReducer = (state = initialState, action: GoodsActionsType): GoodsType => {
    switch (action.type) {
        case 'ADD-GOOD': {
            return {
                ...state,
                [action.payload.shoplistID]: [action.payload.newGood, ...state[action.payload.shoplistID]]
            };
        }
        case 'UPDATE-GOOD': {
            return {
                ...state,
                [action.payload.shoplistId]: state[action.payload.shoplistId].map(g => g.id === action.payload.goodId ? {...g, ...action.payload.model} : g)
            }
        }
        case 'REMOVE-GOOD': {
            return {
                ...state,
                [action.payload.shoplistID]: state[action.payload.shoplistID].filter(s => s.id !== action.payload.goodID)
            }
        }
        case 'SET-GOODS': {
            return {...state, [action.payload.shoplistsId]: action.payload.goods}
        }
        case 'SET-SHOPLISTS': {
            const copyState = {...state}
            action.payload.shoplists.forEach(el => copyState[el.id] = [])
            return copyState
        }
        case 'ADD-SHOPLIST': {
            return {...state, [action.payload.shoplistId]: []};
        }
        case 'REMOVE-SHOPLIST': {
            delete state[action.payload.shoplistID]
            return {...state};
        }
        default:
            return state;
    }
}

//actions
export const addGoodAC = (shoplistID: string, newGood: TaskTypeAPI) => ({
    type: 'ADD-GOOD',
    payload: {
        shoplistID,
        newGood
    }
} as const)

export const removeGoodAC = (shoplistID: string, goodID: string) => ({
    type: 'REMOVE-GOOD',
    payload: {
        shoplistID,
        goodID
    }
} as const)

export const setGoods = (shoplistsId: string, goods: TaskTypeAPI[]) => ({
    type: 'SET-GOODS',
    payload: {shoplistsId, goods}
} as const)

export const updateGood = (shoplistId: string, goodId: string, model: UpdateTaskModelFlex) => ({
    type: 'UPDATE-GOOD',
    payload: {shoplistId, goodId, model}
} as const)


//thunks
export const getGoodsTC = (shoplistId: string): AppThunkType => (dispatch) => {
    goodsAPI.getGoods(shoplistId)
        .then(res => {
            dispatch(setGoods(shoplistId, res.data.items))
        })
}

export const addGoodTC = (id: string, newTitle: string): AppThunkType => (dispatch) => {
    goodsAPI.addGood(id, newTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addGoodAC(id, res.data.data.item))
            }
        })
}

export const removeGoodTC = (shoplistId: string, goodId: string): AppThunkType => (dispatch) => {
    goodsAPI.removeGood(shoplistId, goodId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeGoodAC(shoplistId, goodId))
            }
        })
}

export const updateGoodTC = (shoplistId: string, goodId: string, data: UpdateTaskModelFlex): AppThunkType => (dispatch, getState: () => RootState) => {
    const task = getState().goods[shoplistId].find(el => el.id === goodId);
    if (task) {
        const model: UpdateTaskType = {...task, ...data}
        goodsAPI.updateGood(shoplistId, goodId, model)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateGood(shoplistId, goodId, data))
                }
            })
    }
}

//types
export type GoodsActionsType =
    | AddShoplistACType
    | ReturnType<typeof addGoodAC>
    | ReturnType<typeof removeGoodAC>
    | RemoveShoplistACType
    | ReturnType<typeof setGoods>
    | SetShoplistACType
    | UpdateGoodType

export type UpdateGoodType = ReturnType<typeof updateGood>

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskTypeAPI = {
    description: string | null
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskType = {
    title: string
    description: string | null
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}

export type UpdateTaskModelFlex = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}