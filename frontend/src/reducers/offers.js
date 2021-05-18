export default function(offers = [], action){

    if(action.type == 'addOffer'){
        var addOfferCopy = [...offers]
        addOfferCopy.push(action.addOffer)
        
        return addOfferCopy
    }
    else return offers
}