import React, {useState} from 'react'
import './App.css'
import ShopList, {FilterType} from './components/ShopList';
import {v1} from 'uuid';
import {
    AppBar,
    Button,
    Container,
    createTheme,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography, useMediaQuery
} from '@mui/material';
import AddItemForm from './components/AddItemForm';
import {Menu} from '@mui/icons-material';


export type ShoplistType = {
    id: string, title: string, filter: FilterType
}

export type GoodType = { id: string, title: string, inBacket: boolean }

export type GoodsType = {
    [key: string]: GoodType[];
}

export function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    let shoplistID1 = v1()
    let shoplistID2 = v1()

    let [shoplists, setShoplists] = useState<ShoplistType[]>([
        {id: shoplistID1, title: 'buy today', filter: 'all'},
        {id: shoplistID2, title: 'buy tomorrow', filter: 'all'},
    ])

    let [goods, setGoods] = useState<GoodsType>({
        [shoplistID1]: [
            {id: v1(), title: 'Book - HTML&CSS', inBacket: true},
            {id: v1(), title: 'Book - JS', inBacket: true},
            {id: v1(), title: 'Book - ReactJS', inBacket: false},

        ],
        [shoplistID2]: [
            {id: v1(), title: 'Book - Rest API', inBacket: false},
            {id: v1(), title: 'Book - GraphQL', inBacket: false},
        ]
    })

    function addGood(shoplistID: string, newTitle: string) {
        const newGood = {id: v1(), title: newTitle, inBacket: false}
        setGoods({...goods, [shoplistID]: [newGood, ...goods[shoplistID]]})
    }

    function changeGoodStatus(shoplistID: string, goodID: string, newValue: boolean) {
        setGoods({...goods, [shoplistID]: goods[shoplistID].map(g => g.id === goodID ? {...g, inBacket: newValue} : g)})
    }

    function changeTitleGood(shoplistID: string, goodID: string, newTitle: string) {
        setGoods({...goods, [shoplistID]: goods[shoplistID].map(g => g.id === goodID ? {...g, title: newTitle} : g)})
    }

    function removeGood(shoplistID: string, goodID: string) {
        setGoods({...goods, [shoplistID]: goods[shoplistID].filter(g => g.id !== goodID)})
    }

    function addShoplist(newTitle: string) {
        const newId = v1();
        const newShoplist:ShoplistType = {id: newId, title: newTitle, filter: 'all'}
        setShoplists([newShoplist, ...shoplists])
        setGoods({[newId]:[],...goods})
    }

    function changeTitleShoplist(shoplistID: string, newTitle: string) {
        setShoplists(shoplists.map(s => s.id === shoplistID ? {...s, title: newTitle} : s))
    }

    function changeFilterShoplist(shoplistID: string, filter: FilterType) {
        setShoplists(shoplists.map(s => s.id === shoplistID ? {...s, filter} : s))
    }

    function removeShoplist(shoplistID: string) {
        setShoplists(shoplists.filter(s => s.id !== shoplistID));
        delete goods[shoplistID];
    }

    return (
        <ThemeProvider theme={theme}>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container style={{padding: '20px'}}>
                        <AddItemForm callBack={addShoplist}/>
                    </Grid>
                    <Grid container spacing={3}>{shoplists.map(s => {
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}><ShopList
                                    key={s.id}
                                    shoplistID={s.id}
                                    title={s.title}
                                    goods={goods[s.id]}
                                    addGood={addGood}
                                    removeGood={removeGood}
                                    changeGoodStatus={changeGoodStatus}
                                    changeFilterShoplist={changeFilterShoplist}
                                    removeShoplist={removeShoplist}
                                    changeTitleGood={changeTitleGood}
                                    changeTitleShoplist={changeTitleShoplist}
                                    filter={s.filter}
                                /></Paper>
                            </Grid>
                        )
                    })}</Grid>
                </Container>

            </div>
        </ThemeProvider>
    )
}
