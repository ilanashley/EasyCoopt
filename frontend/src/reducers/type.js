export default function(typeId ='Coopteur', action){
    if(action.type == 'addProfileType'){
        return action.typeId
    } else {
        return typeId
    }
}