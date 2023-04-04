import {v1} from 'uuid';
import {addGoodAC, changeGoodStatusAC, changeGoodTitleAC, goodsReducer, removeGoodAC} from './goods-reducer';

test('test should be add new array shoplists ', () => {
    let shoplistID1 = v1()
    let shoplistID2 = v1()
    let startState = {
        [shoplistID1]: [
            {id: v1(), title: 'Book - HTML&CSS', inBacket: true},
            {id: v1(), title: 'Book - JS', inBacket: true},
            {id: v1(), title: 'Book - ReactJS', inBacket: false},

        ],
        [shoplistID2]: [
            {id: v1(), title: 'Book - Rest API', inBacket: false},
            {id: v1(), title: 'Book - GraphQL', inBacket: false},
        ]
    }


    const action = addGoodAC(shoplistID1, 'hello')
    const endState = goodsReducer(startState, action)


    expect(endState[shoplistID1][0].title).toBe('hello')
    expect(endState[shoplistID2][0].title).toBe('Book - Rest API')
    expect(endState[shoplistID1].length).toBe(4)
    expect(endState[shoplistID2].length).toBe(2)

})

test('test should be remove good of shoplists ', () => {
    let shoplistID1 = v1()
    let shoplistID2 = v1()
    let startState = {
        [shoplistID1]: [
            {id: '1', title: 'Book - HTML&CSS', inBacket: true},
            {id: '2', title: 'Book - JS', inBacket: true},
            {id: '3', title: 'Book - ReactJS', inBacket: false},

        ],
        [shoplistID2]: [
            {id: '1', title: 'Book - Rest API', inBacket: false},
            {id: '2', title: 'Book - GraphQL', inBacket: false},
        ]
    }


    const action = removeGoodAC(shoplistID2, '1')
    const endState = goodsReducer(startState, action);


    expect(endState).not.toStrictEqual(startState)
    expect(endState[shoplistID2][0].id).toBe('2')
    expect(endState[shoplistID2][0].title).toBe('Book - GraphQL')
})

test('test should be change good status', () => {
    let shoplistID1 = v1()
    let shoplistID2 = v1()
    let startState = {
        [shoplistID1]: [
            {id: '1', title: 'Book - HTML&CSS', inBacket: true},
            {id: '2', title: 'Book - JS', inBacket: true},
            {id: '3', title: 'Book - ReactJS', inBacket: false},

        ],
        [shoplistID2]: [
            {id: '1', title: 'Book - Rest API', inBacket: false},
            {id: '2', title: 'Book - GraphQL', inBacket: false},
        ]
    }


    const action = changeGoodStatusAC(shoplistID1, '1', false)
    const endState = goodsReducer(startState, action);


    expect(endState[shoplistID1][0].id).toBe('1')
    expect(endState[shoplistID1][0].inBacket).toBeTruthy()
    expect(endState[shoplistID1].length).toBe(3)
    expect(endState[shoplistID2].length).toBe(2)
})

test('test should be change good title', () => {
    let shoplistID1 = v1()
    let shoplistID2 = v1()
    let startState = {
        [shoplistID1]: [
            {id: '1', title: 'Book - HTML&CSS', inBacket: true},
            {id: '2', title: 'Book - JS', inBacket: true},
            {id: '3', title: 'Book - ReactJS', inBacket: false},

        ],
        [shoplistID2]: [
            {id: '1', title: 'Book - Rest API', inBacket: false},
            {id: '2', title: 'Book - GraphQL', inBacket: false},
        ]
    }


    const action = changeGoodTitleAC(shoplistID1, '1', 'newHELLOOOO')
    const endState = goodsReducer(startState, action);


    expect(endState[shoplistID1][0].title).toBe('newHELLOOOO')

})
