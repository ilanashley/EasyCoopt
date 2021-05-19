export default function(typeId = null, action){
    if(action.type == 'addProfileType'){
        return action.typeId
    } else {
        return typeId
    }
}