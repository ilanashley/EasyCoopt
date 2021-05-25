export default function(userId = null, action){
    if(action.type === 'addUserId'){
        return action.userId
    } else {
        return userId
    }
}