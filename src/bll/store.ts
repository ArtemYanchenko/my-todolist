import {ShoplistsActionsType, shoplistsReducer} from './shoplist-reducer';
import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import {GoodsActionsType, goodsReducer} from './goods-reducer';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';


const rootReducer = combineReducers({
    goods:goodsReducer,
    shoplists:shoplistsReducer,
})

export const store = createStore(rootReducer,applyMiddleware(thunk))

export type AllAction = ShoplistsActionsType | GoodsActionsType

export type RootStateType = ReturnType<typeof rootReducer>
export type RootState =ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    RootStateType,
    unknown,
    AllAction
>

// @ts-ignore
window.store = store