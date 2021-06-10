export default function addUserFirstName(userFirstName = null, action){
    if(action.type === 'addUserFirstName'){
        return action.userFirstName
    } else {
        return userFirstName
    }
}