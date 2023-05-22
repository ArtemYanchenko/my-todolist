import React from 'react'
import './App.css'
import ShopList, {FilterType} from './components/ShopList';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import AddItemForm from './components/AddItemForm';
import {Menu} from '@mui/icons-material';
import {addShoplistAC, changeShoplistFilterAC, changeShoplistTitleAC, removeShoplistAC} from './redux/shoplist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './redux/store';


export type ShoplistType = {
    id: string, title: string, filter: FilterType
}

export type GoodType = { id: string, title: string, inBacket: boolean }

export type GoodsType = {
    [key: string]: GoodType[];
}

export function App() {

    const shoplists = useSelector<AppRootState, ShoplistType[]>(state => state.shoplists)
    const dispatch = useDispatch()

    function addShoplist(newTitle: string) {
        dispatch(addShoplistAC(newTitle))
    }

    function changeTitleShoplist(shoplistID: string, newTitle: string) {
        dispatch(changeShoplistTitleAC(shoplistID, newTitle))
    }

    function changeFilterShoplist(shoplistID: string, filter: FilterType) {
        dispatch(changeShoplistFilterAC(shoplistID, filter))
    }

    function removeShoplist(shoplistID: string) {
        dispatch(removeShoplistAC(shoplistID))
    }

    return (
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
                            <Paper style={{padding: '10px'}}>
                                <ShopList
                                    key={s.id}
                                    shoplistID={s.id}
                                    title={s.title}
                                    changeFilterShoplist={changeFilterShoplist}
                                    removeShoplist={removeShoplist}
                                    changeTitleShoplist={changeTitleShoplist}
                                    filter={s.filter}
                                />
                            </Paper>
                        </Grid>
                    )
                })}</Grid>
            </Container>
        </div>
    )
}
