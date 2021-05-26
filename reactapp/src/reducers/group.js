export default function (group = null, action){
    if(action.type === 'addProfileGroup'){
        return action.group
    } else {
        return group
    }
}