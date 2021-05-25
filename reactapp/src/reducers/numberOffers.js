export default function addNumberOffers(numberOffers = null, action){
    if(action.type === 'addNumberOffers'){
        return action.numberOffers
    } else {
        return numberOffers
    }
}