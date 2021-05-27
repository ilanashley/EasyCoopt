import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar'
import Pagination from './Pagination';
import Offers from './Offers';
import { Redirect } from 'react-router';
import PostAddIcon from '@material-ui/icons/PostAdd';
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';

const OffersList = (props) => {

  const [offers, setOffers] = useState([]);
  const [offerIdCoopte, setOfferIdCoopte] = useState('');
  const [offerIdView, setOfferIdView] = useState('')
  const [addOffer, setAddOffer] = useState(false)

  // Select states
  const [offerOwner, setOfferOwner] = useState('Filtrer par recruteur')
  const [offerDate, setOfferDate] = useState('Filtrer par date')
  const [offerCity, setOfferCity] = useState('Filtrer par ville')
  const [offerContract, setOfferContract] = useState('Filtrer par contrat')
  const [offerStatus, setOfferStatus] = useState('filtrer par status')

  // Pagination states
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [offersPerPage, setOffersPerPage] = useState(10);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // Get current referrals
  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = offers.slice(indexOfFirstOffer, indexOfLastOffer);

  const fetchOffers = async () => {
    setLoading(true)
    var rawResponse = await fetch('/offers/get')
    var response = await rawResponse.json()

    let offers = [...response.offers]
    let numberOffers = 0
    let numberReferrals = 0

    if (props.token) {
      if (props.group === 'Coopteur') {
        offers = offers.filter(offer => offer.isActive === true)
        numberOffers = offers.length
       
        let usersToken = []
        for (let i=0; i<offers.length; i++) {
          for(let j=0; j<offers[i].referralsIds.length; j++) {
            if(offers[i].referralsIds[j].userId) {
              usersToken.push(offers[i].referralsIds[j].userId.token)
            }
          }
        }
        numberReferrals = usersToken.filter(token => token === props.token).length
      } else if (props.group === 'Recruteur') {
        numberOffers = offers.length
        for (let i = 0; i < numberOffers; i++) {
          numberReferrals += offers[i].referralsIds.length
        }
      }
    } else {
      offers = offers.filter(offer => offer.isActive === true)
      numberOffers = offers.length
    }

    props.addNumberOffers(numberOffers)
    props.addNumberReferrals(numberReferrals)
    setOffers(offers)
    setLoading(false)

  }

  useEffect(() => {
    fetchOffers()
  }, [])

  // Pagination functions
  const paginate = pageNumber => setCurrentPage(pageNumber)

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1)
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  }

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1)
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }

  // Offers number per page choice
  const handleSelectPerPage = (event) => {
    setOffersPerPage(event.target.value)
  }

  // Archive offer
  var archiveOffer = async (i, offerId) => {
    let newOffers = [...offers]
    let index = i + indexOfFirstOffer
    newOffers[index].isActive = !offers[index].isActive
    setOffers(newOffers)
    const rawResponse = await fetch('/offers/archive', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `isActive=${newOffers[index].isActive}&offerId=${offerId}`
    })
    await rawResponse.json()
  }

  // Recommend someone 
  const recommend = (offerId) => {
    setOfferIdCoopte(offerId)
  }

  // View offer
  const viewOffer = (offerId) => {
    setOfferIdView(offerId)
  }

  if (offerIdCoopte) {
    return <Redirect to={`/addCoopte/${offerIdCoopte}`} />
  } else if (offerIdView) {
    return <Redirect to={`/viewOffer/${offerIdView}`} />
  }

  // Add offer
  const handleOnAddOffer = () => {
    setAddOffer(true)
  }

  if (addOffer) {
    return <Redirect to={`/addOffer`} />
  }

  // Capitalize function
  const capitalize = (arg) => {
    if (typeof arg !== 'string') return ''
    return arg.charAt(0).toUpperCase() + arg.slice(1)
  } 

  // Filter per date
  const addDateArray = offers.map((offer) => { return offer.creationDate })
  const addDateFilteredArray = addDateArray.filter((date, pos) => {
    return addDateArray.indexOf(date) === pos;
  }).sort()
  const addDateFilteredList = addDateFilteredArray.map((date) => {
    var myDate = new Date(date)
    var myDateString = ('0' + myDate.getDate()).slice(-2) + '/'
      + ('0' + (myDate.getMonth() + 1)).slice(-2) + '/'
      + myDate.getFullYear();
    return (<option value={date}>{myDateString}</option>)
  })

  const handleSelectFilteredPerDate = (event) => {
    setOfferDate(event.target.value)
    const offersPerDate = offers.filter(offer => offer.creationDate === event.target.value)
    setOffers(offersPerDate)
  }

  // Filter per city
  const cityArray = offers.map((offer) => { return offer.city })
  const cityFilteredArray = cityArray.filter((city, pos) => {
    return cityArray.indexOf(city) === pos;
  }).sort()
  const cityFilteredList = cityFilteredArray.map((city) => {
    return (<option value={city}>{city}</option>)
  })

  const handleSelectFilteredPerCity = (event) => {
    setOfferCity(event.target.value)
    const offersPerCity = offers.filter(offer => offer.city === event.target.value)
    setOffers(offersPerCity)
  }

  // Fiter per contract
  const contractArray = offers.map((offer) => { return offer.contract })
  const contractFilteredArray = contractArray.filter((offer, pos) => {
    return contractArray.indexOf(offer) === pos;
  }).sort()
  const contractFilteredList = contractFilteredArray.map((contract) => {
    return (<option value={contract}>{contract}</option>)
  })

  const handleSelectFilteredPerContract = (event) => {
    setOfferContract(event.target.value)
    const offersPerContract = offers.filter(offer => offer.contract === event.target.value)
    setOffers(offersPerContract)
  }

  // Filter per status
  const archivedArray = offers.map((offer) => { return offer.isActive })
  const archivedFilteredArray = archivedArray.filter((status, pos) => {
    return archivedArray.indexOf(status) === pos;
  }).reverse()
  const archivedFilteredList = archivedFilteredArray.map((isActive) => {
    let archivedDescription = isActive === true ? 'Active' : 'Inactive'
    return (<option value={isActive}>{archivedDescription}</option>)
  })

  const handleSelectFilteredStatus = (event) => {
    let value = event.target.value === 'true' ? true : false
    setOfferStatus(value)
    const offersPerStatus = offers.filter(offer => offer.isActive === value)
    setOffers(offersPerStatus)
  }

  // Filter per offerOwner
  const offerOwnerArray = offers.map((offer) => { return offer.userId.lastName })
  const offerOwnerFilteredArray = offerOwnerArray.filter((lastName, pos) => {
    return offerOwnerArray.indexOf(lastName) === pos;
  }).sort()
  const offerOwnerFilteredList = offerOwnerFilteredArray.map((lastName) => {
    return (<option value={lastName}>{capitalize(lastName)}</option>)
  })

  const handleSelectFilteredPerOfferOwner = (event) => {
    setOfferOwner(event.target.value)
    const offersPerOfferOwner = offers.filter(offer => offer.userId.lastName === event.target.value)
    setOffers(offersPerOfferOwner)
  }

  // Reset Filters
  const handleSelectResetFilters = () => {
    setOfferOwner('Filtrer par recruteur')
    setOfferDate('Filtrer par date')
    setOfferCity('Filtrer par ville')
    setOfferContract('Filtrer par contrat')
    setOfferStatus('filtrer par status')
    fetchOffers()
  }

  let addOfferButton
  if (props.group === 'Recruteur') {
    addOfferButton = <div className='perPageContainer w-100'>
      <button onClick={() => handleOnAddOffer()} className='custom-btn-style w-100'><PostAddIcon fontSize='large' />
        Ajouter une offre
      </button>
    </div>
  }

  let filterPerStatus
  if (props.group === 'Recruteur') {
    filterPerStatus = <select value={offerStatus} onChange={handleSelectFilteredStatus} className="custom-form-select mr-2" aria-label="Default select example">
      <option>Filtrer par statut</option>
      {archivedFilteredList}
    </select>
  }

  return (
    <div className='mainContainer'>

      <NavBar />

      <div className='container-lg'>

        <div className='titleContainer'>
          <h1>Offres en cours</h1>
        </div>

        <div className='selectContainer'>
          <select value={offerDate} onChange={handleSelectFilteredPerDate} className="custom-form-select mr-2" aria-label="Default select example">
            <option >Filtrer par date</option>
            {addDateFilteredList}
          </select>
          <select value={offerCity} onChange={handleSelectFilteredPerCity} className="custom-form-select mr-2" aria-label="Default select example">
            <option >Filtrer par ville</option>
            {cityFilteredList}
          </select>
          <select value={offerContract} onChange={handleSelectFilteredPerContract} className="custom-form-select mr-2" aria-label="Default select example">
            <option >Filtrer par contrat</option>
            {contractFilteredList}
          </select>
          {filterPerStatus}
          <select value={offerOwner} onChange={handleSelectFilteredPerOfferOwner} className="custom-form-select mr-2" aria-label="Default select example">
            <option>Filtrer par recruteur</option>
            {offerOwnerFilteredList}
          </select>
          <button onClick={handleSelectResetFilters} className='custom-btn-style'><RotateLeftOutlinedIcon /></button>
        </div>

        {addOfferButton}

        <div className='tableContainer'>
          <Offers currentOffers={currentOffers} loading={loading} archiveOffer={archiveOffer} recommend={recommend} viewOffer={viewOffer} />
        </div>

        <div className='perPageContainer'>
          <select className="custom-form-select" defaultValue={offersPerPage} onChange={handleSelectPerPage} aria-label="Default select example">
            <option value="10">10 lignes par page</option>
            <option value="25">25 lignes par page</option>
            <option value="50">50 lignes par page</option>
            <option value="100">100 lignes par page</option>
          </select>
        </div>

        <div className='paginationContainer'>
          <Pagination ItemsPerPage={offersPerPage} totalItems={offers.length} paginate={paginate} handlePrevBtn={handlePrevBtn} handleNextBtn={handleNextBtn} maxPageNumberLimit={maxPageNumberLimit} minPageNumberLimit={minPageNumberLimit} currentPage={currentPage} items={offers} />
        </div>

      </div>
    </div>
  );
}

/* recuperation du token depuis redux */
function mapStateToProps(state) {
  return {
    token: state.token,
    group: state.group
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addNumberOffers: function (numberOffers) {
      dispatch({ type: 'addNumberOffers', numberOffers })
    },
    addNumberReferrals: function (numberReferrals) {
      dispatch({ type: 'addNumberReferrals', numberReferrals })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OffersList);


