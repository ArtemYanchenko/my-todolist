import {v1} from 'uuid';
import {ShoplistType} from '../App';
import {
    addShoplistAC,
    changeShoplistFilterAC,
    changeShoplistTitleAC,
    removeShoplistAC,
    shoplistsReducer
} from './shoplist-reducer';

test('test should be return new array shoplists ', () => {

    let shoplistID1 = v1()
    let shoplistID2 = v1()

    const startState: Array<ShoplistType> = [
        {id: shoplistID1, title: 'buy today', filter: 'all'},
        {id: shoplistID2, title: 'buy tomorrow', filter: 'all'},
    ]

    const endState = shoplistsReducer(startState, addShoplistAC('hello'))

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

    const endState = shoplistsReducer(startState, changeShoplistTitleAC(shoplistID1,'hihihi'))

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

    const endState = shoplistsReducer(startState, removeShoplistAC(shoplistID2))

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

    const endState = shoplistsReducer(startState, changeShoplistFilterAC(shoplistID2,'completed'))

    expect(endState[1].filter).toBe('completed')
    expect(endState.length).toBe(2)

})