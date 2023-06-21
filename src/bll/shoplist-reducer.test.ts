import {v1} from 'uuid';
import {
    addShoplistAC,
    changeShoplistFilterAC,
    changeShoplistTitleAC,
    removeShoplistAC, setShoplistAC,
    ShoplistDomainType,
    shoplistsReducer
} from './shoplist-reducer';

let startState: Array<ShoplistDomainType>;

beforeEach(() => {
    startState = [
        {id: "shoplistID1", title: 'buy today', filter: 'all', addedDate: '', order: 0},
        {id: "shoplistID2", title: 'buy tomorrow', filter: 'all', addedDate: '', order: 0},
    ]
})

test('shoplists should be return new array shoplists', () => {
    const endState = shoplistsReducer(startState, addShoplistAC('hello'))

    expect(endState[0].title).toBe('hello')
    expect(endState.length).toBe(3)
})


test('shoplists should be return new title shoplist', () => {
    const endState = shoplistsReducer(startState, changeShoplistTitleAC("shoplistID1", 'helloWorld!!!'))

    expect(endState[0].title).toBe('helloWorld!!!')
    expect(endState.length).toBe(2)
})


test('should be remove shoplist', () => {
    const endState = shoplistsReducer(startState, removeShoplistAC("shoplistID2"))

    expect(endState[0].title).toBe('buy today')
    expect(endState[1]).toBeUndefined();
    expect(endState.length).toBe(1)
})


test('should be edit filter shoplist', () => {
    const endState = shoplistsReducer(startState, changeShoplistFilterAC("shoplistID2", 'completed'))

    expect(endState[1].filter).toBe('completed')
    expect(endState.length).toBe(2)
})

test('should be added new shoplist', () => {
    let startState: Array<ShoplistDomainType> = [];
    const newTodos= [
        {id: "shoplistID1", title: 'buy today', filter: 'all', addedDate: '', order: 0},
        {id: "shoplistID2", title: 'buy tomorrow', filter: 'all', addedDate: '', order: 0},
    ]
    const endState = shoplistsReducer(startState, setShoplistAC(newTodos))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('buy today')
    expect(endState[1].title).toBe('buy tomorrow')
})