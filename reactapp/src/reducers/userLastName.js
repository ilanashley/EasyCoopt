export default function(userLastName = null, action){
    if(action.type === 'addUserLastName'){
        return action.userLastName
    } else {
        return userLastName
    }
}