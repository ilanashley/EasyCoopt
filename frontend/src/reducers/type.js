export default function(typeID = '', action){
    if(action.type == 'addProfileType'){
        console.log('type dans le reducer -->',action.typeID)
        return action.typeID
    } else {
        return typeID
    }
}