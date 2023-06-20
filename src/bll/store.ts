import {shoplistsReducer} from './shoplist-reducer';
import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import {goodsReducer} from './goods-reducer';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';


const rootReducer = combineReducers({
    goods:goodsReducer,
    shoplists:shoplistsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>
export type RootState =ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>
//@ts-ignore
window.store = store