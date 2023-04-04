import {v1} from 'uuid';
import {ShoplistType} from '../App';
import {shoplistsReducer} from './shoplist-reducer';

test('test should be return new array shoplists ', () => {

    let shoplistID1 = v1()
    let shoplistID2 = v1()

    const startState: Array<ShoplistType> = [
        {id: shoplistID1, title: 'buy today', filter: 'all'},
        {id: shoplistID2, title: 'buy tomorrow', filter: 'all'},
    ]

    const action = {type: 'ADD-SHOPLIST', newTitle: 'hello'}
    const endState = shoplistsReducer(startState, action)

    expect(endState[0].title).toBe('hello')
    expect(endState.length).toBe(3)

})
