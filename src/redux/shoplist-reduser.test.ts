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


test('test should be return new title shoplist ', () => {

    let shoplistID1 = v1()
    let shoplistID2 = v1()

    const startState: Array<ShoplistType> = [
        {id: shoplistID1, title: 'buy today', filter: 'all'},
        {id: shoplistID2, title: 'buy tomorrow', filter: 'all'},
    ]

    const action = {type: 'CHANGE-SHOPLIST-TITLE', shoplistID: shoplistID1, newTitle: 'hihihi'}
    const endState = shoplistsReducer(startState, action)

    expect(endState[0].title).toBe('hihihi')
    expect(endState.length).toBe(2)

})


test('test should be remove shoplist ', () => {

    let shoplistID1 = v1()
    let shoplistID2 = v1()

    const startState: Array<ShoplistType> = [
        {id: shoplistID1, title: 'buy today', filter: 'all'},
        {id: shoplistID2, title: 'buy tomorrow', filter: 'all'},
    ]

    const action = {type: 'REMOVE-SHOPLIST', shoplistID: shoplistID2}
    const endState = shoplistsReducer(startState, action)

    expect(endState[0].title).toBe('buy today')
    expect(endState[1]).toBeUndefined();
    expect(endState.length).toBe(1)

})


test('test should be edit filter shoplist', () => {

    let shoplistID1 = v1()
    let shoplistID2 = v1()

    const startState: Array<ShoplistType> = [
        {id: shoplistID1, title: 'buy today', filter: 'all'},
        {id: shoplistID2, title: 'buy tomorrow', filter: 'all'},
    ]

    const action = {type: 'CHANGE-SHOPLIST-FILTER', shoplistID: shoplistID2, newFilter: 'completed'}
    const endState = shoplistsReducer(startState, action)

    expect(endState[1].filter).toBe('completed')
    expect(endState.length).toBe(2)

})