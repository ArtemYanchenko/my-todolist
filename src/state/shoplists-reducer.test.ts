import {shoplistsReducer} from './shoplists-reducer'
import {v1} from 'uuid'
import {FilterType, ShoplistType} from '../App';


test('correct shoplist should be removed', () => {
    const shoplistID1 = v1();
    const shoplistID2 = v1();

    const startState: ShoplistType[] = [
        {id: shoplistID1, title: 'shop today', filter: 'all'},
        {id: shoplistID2, title: 'shop later', filter: 'all'},
    ]

    const action = {
        type: 'REMOVE-SHOPLIST' as const,
        shoplistID: shoplistID1
    }

    const endState = shoplistsReducer(startState, action)

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

    const action = {
        type: 'ADD-SHOPLIST' as const,
        title: 'Hello world !!!'
    }

    const endState = shoplistsReducer(startState, action)

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

    const action = {
        type: 'CHANGE-SHOPLIST-TITLE' as const,
        shoplistID: shoplistID1,
        title: 'what to know'
    }

    const endState = shoplistsReducer(startState, action)

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

    const action = {
        type: 'CHANGE-SHOPLIST-FILTER' as const,
        shoplistID: shoplistID1,
        filter: newFilterValue
    }

    const endState = shoplistsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('in basket')
    expect(endState[1].title).toBe('shop later')
})