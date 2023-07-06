type AppStatusType = 'idle' | 'loading'

type  InitialStateType = {
    isAuth:boolean
    status:AppStatusType
}
const initialState:InitialStateType = {
    isAuth:false,
    status:'idle'
}
export const appReducer = (state = initialState,action:any)=>{

}