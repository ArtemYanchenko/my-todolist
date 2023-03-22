import {
    addShoplistAC,
    changeShoplistFilterAC,
    changeShoplistTitleAC,
    removeShoplistAC,
    shoplistsReducer
} from './shoplists-reducer'
import {v1} from 'uuid'
import {FilterType, ShoplistType} from '../App';


test('correct shoplist should be removed', () => {
    const shoplistID1 = v1();
    const shoplistID2 = v1();

    const startState: ShoplistType[] = [
        {id: shoplistID1, title: 'shop today', filter: 'all'},
        {id: shoplistID2, title: 'shop later', filter: 'all'},
    ]

    const endState = shoplistsReducer(startState, removeShoplistAC(shoplistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(shoplistID2)
})

test('correct shoplist should be added', () => {
    const shoplistID1 = v1();
    const shoplistID2 = v1();

    const startState: ShoplistType[] = [
        {id: shoplistID1, title: 'shop today', filter: 'all'},
        {id: shoplistID2, title: 'shop later', filter: 'all'},
    ]

    const endState = shoplistsReducer(startState, addShoplistAC('Hello world !!!'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('Hello world !!!')
    expect(endState[0].filter).toBe('all')
})

test('correct shoplist should be change title', () => {
    const shoplistID1 = v1();
    const shoplistID2 = v1();

    const startState: ShoplistType[] = [
        {id: shoplistID1, title: 'shop today', filter: 'all'},
        {id: shoplistID2, title: 'shop later', filter: 'all'},
    ]

    const endState = shoplistsReducer(startState, changeShoplistTitleAC(shoplistID1, 'what to know'))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('what to know')
    expect(endState[1].title).toBe('shop later')
})

test('correct shoplist should be change filter', () => {
    const shoplistID1 = v1();
    const shoplistID2 = v1();
    const newFilterValue: FilterType = 'in basket'

    const startState: ShoplistType[] = [
        {id: shoplistID1, title: 'shop today', filter: 'all'},
        {id: shoplistID2, title: 'shop later', filter: 'all'},
    ]

    const endState = shoplistsReducer(startState, changeShoplistFilterAC(shoplistID1, newFilterValue))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('in basket')
    expect(endState[1].title).toBe('shop later')
})