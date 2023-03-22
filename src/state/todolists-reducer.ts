import {ShoplistType} from '../App';


type ActionType = {
    type:string
    [key:string]:any
}

export const todolistsReducer = (state:ShoplistType[],action:ActionType) => {
        switch (action.type) {
            case 'aaa':
                return
        }
}