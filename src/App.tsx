import React, {useEffect} from 'react'
import './App.css'
import ShopList, {FilterType} from './components/ShopList';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import AddItemForm from './components/AddItemForm';
import {Menu} from '@mui/icons-material';
import {addTodosTC, getTodosTC} from './bll/shoplist-reducer';
import {useAppDispatch, useAppSelector} from './hooks/hooks';
import {TaskTypeAPI} from './bll/goods-reducer';


export type ShoplistType = {
    id: string, title: string, filter: FilterType
}

export type GoodType = { id: string, title: string, inBacket: boolean }

export type GoodsType = {
    [key: string]: TaskTypeAPI[];
}

export function App() {
    const shoplists = useAppSelector(state => state.shoplists)
    const dispatch = useAppDispatch()

    const addShoplist = (newTitle: string) => {
        dispatch(addTodosTC(newTitle))
    }
    useEffect(()=>{
        dispatch(getTodosTC())
    },[])
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
                        <Grid item key={s.id}>
                            <Paper style={{padding: '10px'}}>
                                <ShopList
                                    key={s.id}
                                    shoplistID={s.id}
                                    title={s.title}
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