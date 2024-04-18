export const User=(state=false,action)=>{
    switch(action.type){
        case 'setUser':
            return action.data
        default:
            return state
    }
}
export const setUser=(data)=>{
    return{
        type:'setUser',
        data
    }
}

export const AuthTokens=(state=false,action)=>{
    switch(action.type){
        case 'setAuthTokens':
            return action.data
        default:
            return state
    }
}
export const setAuthTokens=(data)=>{
    return{
        type:'setAuthTokens',
        data
    }
}

export const currentProduct=(state=false,action)=>{
    switch(action.type){
        case 'SetProduct':
            return action.data
        default:
            return state
    }
}
export const setProduct=(data)=>{
    return{
        type:'SetProduct',
        data
    }
}
export const queryResults=(state=false,action)=>{
    switch(action.type){
        case 'setResults':
            return action.data
        default:
            return state
    }
}