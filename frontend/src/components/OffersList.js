import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import Pagination from './Pagination';
import Offers from './Offers';
import { Redirect } from 'react-router';
import PostAddIcon from '@material-ui/icons/PostAdd';


const OffersList = (props) => {


  const [offers, setOffers] = useState([]);
  const [ajoutId, setAjoutId] = useState([]);
  const [offerId, setOfferId] = useState('');
  const [offerIdView, setOfferIdView] = useState('')
  

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
    setOffers(response.offers)
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

  // Enlever offre

  var archiveOffer = async (id) => {
    console.log('Id', id)

    const archiveReq = await fetch('/offers/archive', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `status=${false}&id=${id}`
    })
    const body = await archiveReq.json()

    console.log(body)
    if (body.result === true) {

      setAjoutId([...ajoutId, body.offerCurrent._id])
      console.log('Je suis là')
    }
  }
  /* function pour recommander*/
  const recommend = (offerId) => {
    setOfferId(offerId)
  }

  // Function pour voir l'offre
  const viewOffer = (offerId) => {
    setOfferIdView(offerId)
  }

  if (offerId) {
    return <Redirect to={`/addCoopte/${offerId}`} />
  } else if (offerIdView) {
    return <Redirect to={`/viewOffer/${offerIdView}`} />
  }

  // Filter per date
  const addDateArray = offers.map((offer) => { return offer.creationDate })
  const addDateFilteredArray = addDateArray.filter((date, pos) => {
    return addDateArray.indexOf(date) === pos;
  }).sort()
  const addDateFilteredList = addDateFilteredArray.map((date) => {
    var myDate = new Date(date)
    var myDateString = ('0' + myDate.getDate()).slice(-2) + '/'
        + ('0' + (myDate.getMonth()+1)).slice(-2) + '/'
        + myDate.getFullYear();
    return (<option value={date}>{myDateString}</option>)
  })

  const handleSelectFilteredPerDate = (event) => {
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
    const offersPerContract = offers.filter(offer => offer.contract === event.target.value)
    setOffers(offersPerContract)
  }

  // Reset Filters
  const handleSelectResetFilters = () => {
    fetchOffers()
  }

  return (

    <div className='mainContainer'>

      <NavBar />

      <div className='container-lg'>

        <div className='titleContainer'>
          <h1>Offres en cours</h1>
        </div>

        <div className='selectContainer'>
          <select onChange={handleSelectFilteredPerDate} className="custom-form-select mr-2" aria-label="Default select example">
            <option selected>Filtrer par date</option>
            {addDateFilteredList}
          </select>
          <select onChange={handleSelectFilteredPerCity} className="custom-form-select mr-2" aria-label="Default select example">
            <option selected>Filtrer par ville</option>
            {cityFilteredList}
          </select>
          <select onChange={handleSelectFilteredPerContract} className="custom-form-select mr-2" aria-label="Default select example">
            <option selected>Filtrer par contrat</option>
            {contractFilteredList}
          </select>
          <button onClick={handleSelectResetFilters} className='custom-btn-style'>Supprimer</button>
        </div>

        <div className='selectContainer'>
          <Link to={"/addoffer/"}><PostAddIcon fontSize='large'/></Link> 
          <p>Ajouter une Offre</p>
        </div>

        <div className='tableContainer'>
          <Offers currentOffers={currentOffers} loading={loading} ajoutId={ajoutId} archiveOffer={archiveOffer} recommend={recommend} viewOffer={viewOffer}/>
        </div>

        <div className='perPageContainer'>
          <select className="custom-form-select" defaultValue={offersPerPage} onChange={handleSelectPerPage} aria-label="Default select example">
            <option value="10">10 par page</option>
            <option value="20">20 par page</option>
            <option value="30">30 par page</option>
            <option value="40">40 par page</option>
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
    token: state.token
  };
}

export default connect(
  mapStateToProps,
  null
)(OffersList);


