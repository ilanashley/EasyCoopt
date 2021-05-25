export default function addProfileType(typeId = null, action){
    if(action.type === 'addProfileType'){
        return action.typeId
    } else {
        return typeId
    }
}