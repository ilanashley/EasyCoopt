export default function(typeId = '', action){
    if(action.type == 'addProfileType'){
        return action.typeId
    } else {
        return typeId
    }
}