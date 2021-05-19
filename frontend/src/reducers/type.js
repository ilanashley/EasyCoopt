export default function(typeID = '', action){
    if(action.type == 'addProfileType'){
        return action.typeID
    } else {
        return typeID
    }
}