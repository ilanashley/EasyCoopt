export default function addProfileGroup(group = null, action){
    if(action.type === 'addProfileGroup'){
        return action.group
    } else {
        return group
    }
}