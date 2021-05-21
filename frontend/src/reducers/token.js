export default function(token = null, action){
    if(action.type === 'addToken'){
        return action.token
    } else {
        return token
    }
}