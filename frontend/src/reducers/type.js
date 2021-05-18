export default function(type = '', action){
    if(action.type == 'addProfileType'){
        return action.type
    } else {
        return type
    }
}