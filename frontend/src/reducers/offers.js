export default function (offers = [], action) {

    if (action.type === 'addAnOffer') {
        var saveOfferCopy = [...offers]
        saveOfferCopy.push(action.offerAdded)

        return saveOfferCopy
    }
    // else if(action.type == 'deleteOffer'){
    //     var addOfferCopy = [...offers]
    //     var position = null

    //     for(let i=0;i<addOfferCopy.length;i++){
    //         if(addOfferCopy[i].title == action.title){
    //             position = i
    //         }
    //     }
    //     if(position != null){
    //         addOfferCopy.splice(position,1)
    //     }

    //     return addOfferCopy
    // }
    else {
        return offers
    }
}