import {addGoodAC, goodsReducer, removeGoodAC, setGoods, TaskStatuses, updateGood} from './goods-reducer';
import {GoodsType} from '../App';

let startState:GoodsType

beforeEach(()=>{
     startState = {
        ["shoplistID1"]: [
            {
                id: "1",
                title: "react",
                description: null,
                todoListId: "shoplistID1",
                order: 0,
                status: 0,
                priority: 1,
                startDate: null,
                deadline: null,
                addedDate: "2023-07-20T13:23:57.79"
            },
            {
                id: "2",
                title: "redux",
                description: null,
                todoListId: "shoplistID1",
                order: 0,
                status: 0,
                priority: 1,
                startDate: null,
                deadline: null,
                addedDate: "2023-06-20T13:23:57.79"
            }
        ],
        ["shoplistID2"]: [
            {
                id: "11",
                title: "angular",
                description: null,
                todoListId: "shoplistID2",
                order: 0,
                status: 0,
                priority: 1,
                startDate: null,
                deadline: null,
                addedDate: "2023-07-20T13:23:57.79"
            },
            {
                id: "22",
                title: "vue",
                description: null,
                todoListId: "shoplistID2",
                order: 0,
                status: 0,
                priority: 1,
                startDate: null,
                deadline: null,
                addedDate: "2023-06-20T13:23:57.79"
            }
        ]
    }
})

test('goods should be add new array shoplists', () => {
    const newGood =  {
        id: "123",
        title: "RTK",
        description: null,
        todoListId: "shoplistID1",
        order: 0,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: "2023-06-20T13:23:57.79"
    }

    const action = addGoodAC('shoplistID1', newGood)
    const endState = goodsReducer(startState, action)

    expect(endState["shoplistID1"][0].title).toBe('RTK')
    expect(endState["shoplistID2"][0].title).toBe('angular')
    expect(endState["shoplistID1"].length).toBe(3)
    expect(endState["shoplistID2"].length).toBe(2)
})

test('goods should be remove good of shoplists', () => {
    const action = removeGoodAC("shoplistID2", '11')
    const endState = goodsReducer(startState, action);

    expect(endState["shoplistID2"].length).toBe(1)
    expect(endState["shoplistID2"][0].id).toBe('22')
    expect(endState["shoplistID2"][0].title).toBe('vue')
})

test('goods should be change good status', () => {
    const action = updateGood("shoplistID1", '1', {status:TaskStatuses.Completed})
    const endState = goodsReducer(startState, action)

    expect(endState["shoplistID1"][0].status).toBe(2)
    expect(endState["shoplistID1"][1].status).toBe(0)
})

test('goods should be change good title', () => {
    const action = updateGood("shoplistID1", '1', {title:'newHELLOOOO'})
    const endState = goodsReducer(startState, action);

    expect(endState["shoplistID1"][0].title).toBe('newHELLOOOO')
    expect(endState["shoplistID1"][1].title).toBe('redux')
})

test('goods should be added in shoplist', () => {
    const goods = [
        {
            id: "11",
            title: "angular",
            description: null,
            todoListId: "shoplistID2",
            order: 0,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
            addedDate: "2023-07-20T13:23:57.79"
        },
        {
            id: "22",
            title: "vue",
            description: null,
            todoListId: "shoplistID2",
            order: 0,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
            addedDate: "2023-06-20T13:23:57.79"
        }
    ]
    const startStateFromSetGoodsTest:GoodsType = {['shoplistID1']:[]}
    const action = setGoods("shoplistID1", goods)
    const endState = goodsReducer(startStateFromSetGoodsTest, action);

    expect(endState["shoplistID1"][0].title).toBe('angular')
    expect(endState["shoplistID1"][1].title).toBe('vue')
})
