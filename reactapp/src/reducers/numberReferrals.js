export default function addNumberReferrals(numberReferrals = null, action){
    if(action.type === 'addNumberReferrals'){
        return action.numberReferrals
    } else {
        return numberReferrals
    }
}