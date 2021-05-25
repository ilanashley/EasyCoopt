export default function addToken(token = null, action){
    if(action.type === 'addToken'){
        return action.token
    } else {
        return token
    }
}