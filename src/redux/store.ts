import {goodsReducer} from './goods-reducer';
import {shoplistsReducer} from './shoplist-reducer';
import {combineReducers, legacy_createStore} from 'redux';


const rootReducer = combineReducers({
    goods:goodsReducer,
    shoplists:shoplistsReducer,
})

export type AppRootState = ReturnType<typeof rootReducer>
export const store = legacy_createStore(rootReducer)
