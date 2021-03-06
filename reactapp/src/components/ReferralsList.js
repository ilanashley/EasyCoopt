import React, { useState, useEffect } from 'react';
import '../App.css';
import Referrals from './Referrals';
import Pagination from './Pagination';
import NavBar from './NavBar'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';

const ReferralsList = (props) => {

  // Global state
  const [referrals, setReferrals] = useState([]);

  // Select states
  const [referralDate, setReferralDate] = useState('Filtrer par date')
  const [offerOwner, setOfferOwner] = useState('Filtrer par recruteur')
  const [referralOwner, setReferralOwner] = useState('Filtrer par coopteur')
  const [referralCoopted, setReferralCoopted] = useState('Filtrer par coopté')
  const [referralStatus, setReferralStatus] = useState('Filtrer par statut')
 

  // Pagination states
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [referralsPerPage, setReferralsPerPage] = useState(10);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // Get current referrals
  const indexOfLastReferral = currentPage * referralsPerPage;
  const indexOfFirstReferral = indexOfLastReferral - referralsPerPage;
  const currentReferrals = referrals.slice(indexOfFirstReferral, indexOfLastReferral);

  // Fetch backend to get referrals
  const fetchReferrals = async () => {
    setLoading(true)
    var rawResponse = await fetch('/referrals/get')
    var response = await rawResponse.json()
    if (props.group === 'Coopteur') {
      let filteredReferrals = response.referrals.filter(referral => referral.userId.token === props.token)
      setReferrals(filteredReferrals.reverse())
    } else {
      setReferrals(response.referrals.reverse())
    }
    setLoading(false)
  }

  // Fetch backend to delete referral by id
  const handleDeleteReferral = async (referralId, offerId) => {
    var rawResponse = await fetch(`/referrals/delete/${referralId}/${offerId}`, {
      method: 'DELETE'
    })
    await rawResponse.json()
    fetchReferrals()
  }

  // A l'execution de l'app...
  useEffect(() => {
    fetchReferrals()
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

  // Referrals number per page choice
  const handleSelectPerPage = (event) => {
    setReferralsPerPage(event.target.value)
  }

  // Capitalize function
  const capitalize = (arg) => {
    if (typeof arg !== 'string') return ''
    return arg.charAt(0).toUpperCase() + arg.slice(1)
  }

  // Status choice per referral
  const handleSelectStatusChange = async (event, i, referralId) => {
    let newReferrals = [...referrals]
    let index = i + indexOfFirstReferral
    newReferrals[index].status = event.target.value
    setReferrals(newReferrals)
    var rawResponse = await fetch('/referrals/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `referralStatus=${event.target.value}&referralId=${referralId}`
    })
    await rawResponse.json()
  }

  ///////// Filters //////////////////////////////

  // Filter per date
  const addDateArray = referrals.map((referral) => { return referral.creationDate })
  const addDateFilteredArray = addDateArray.filter((date, pos) => {
    return addDateArray.indexOf(date) === pos;
  })
  const addDateFilteredList = addDateFilteredArray.map((date) => {
    var myDate = new Date(date)
    var myDateString = ('0' + myDate.getDate()).slice(-2) + '/'
      + ('0' + (myDate.getMonth() + 1)).slice(-2) + '/'
      + myDate.getFullYear();
    return (<option value={date}>{myDateString}</option>)
  })

  const handleSelectFilteredDate = (event) => {
    setReferralDate(event.target.value)
    const referralsPerDate = referrals.filter(referral => referral.creationDate === event.target.value)
    setReferrals(referralsPerDate)
  }

  // Filter per recipient
  const recipientArray = referrals.map((referral) => { return referral.userId.lastName })
  const recipientFilteredArray = recipientArray.filter((recipient, pos) => {
    return recipientArray.indexOf(recipient) === pos;
  }).sort()
  const recipientFilteredList = recipientFilteredArray.map((recipient) => {
    return (<option value={recipient}>{capitalize(recipient)}</option>)
  })

  const handleSelectFilteredRecipient = (event) => {
    setReferralOwner(event.target.value)
    const referralsPerRecipient = referrals.filter(referral => referral.userId.lastName === event.target.value)
    setReferrals(referralsPerRecipient)
  }

  // Fiter per referral
  const referralArray = referrals.map((referral) => { return referral.lastName })
  const referralFilteredArray = referralArray.filter((referral, pos) => {
    return referralArray.indexOf(referral) === pos;
  }).sort()
  const referralFilteredList = referralFilteredArray.map((referral) => {
    return (<option value={referral}>{capitalize(referral)}</option>)
  })

  const handleSelectFilteredReferral = (event) => {
    setReferralCoopted(event.target.value)
    const referralsPerReferral = referrals.filter(referral => referral.lastName === event.target.value)
    setReferrals(referralsPerReferral)
  }

  // Filter per status
  const statusArray = referrals.map((referral) => { return referral.status })
  const statusFilteredArray = statusArray.filter((status, pos) => {
    return statusArray.indexOf(status) === pos;
  }).sort()
  const statusFilteredList = statusFilteredArray.map((status) => {
    let statusDescription = status === '1' ? 'En cours' : (status === '2' ? 'Approuvé' : 'Refusé')
    return (<option value={status}>{statusDescription}</option>)
  })

  const handleSelectFilteredStatus = (event) => {
    setReferralStatus(event.target.value)
    const referralsPerStatus = referrals.filter(referral => referral.status === event.target.value)
    setReferrals(referralsPerStatus)
  }

  // Filter per offerOwner
  const offerOwnerArray = referrals.map((referral) => { return referral.offerId.userId.lastName })
  const offerOwnerFilteredArray = offerOwnerArray.filter((lastName, pos) => {
    return offerOwnerArray.indexOf(lastName) === pos;
  }).sort()
  const offerOwnerFilteredList = offerOwnerFilteredArray.map((lastName) => {
    return (<option value={lastName}>{capitalize(lastName)}</option>)
  })

  const handleSelectFilteredPerOfferOwner = (event) => {
    setOfferOwner(event.target.value)
    const offersPerOfferOwner = referrals.filter(referral => referral.offerId.userId.lastName === event.target.value)
    setReferrals(offersPerOfferOwner)
  }

  // Reset Filters
  const handleSelectResetFilters = () => {
    setReferralDate('Filtrer par date')
    setOfferOwner('Filtrer par recruteur')
    setReferralOwner('Filtrer par coopteur')
    setReferralCoopted('Filtrer par coopté')
    setReferralStatus('Filtrer par statut')
    fetchReferrals()
  }

  // Redirection
  if (!props.token) {
    return <Redirect to="/login" />;
  }

  let filterPerRecipient
  let filterPerOfferOwner
  if (props.group === 'Recruteur') {
    filterPerRecipient = <select value={referralOwner} onChange={handleSelectFilteredRecipient} className="custom-form-select mr-2" aria-label="Default select example">
      <option>Filtrer par coopteur</option>
      {recipientFilteredList}
    </select>
    filterPerOfferOwner = <select value={offerOwner} onChange={handleSelectFilteredPerOfferOwner} className="custom-form-select mr-2" aria-label="Default select example">
      <option>Filtrer par recruteur</option>
      {offerOwnerFilteredList}
    </select>
  }

  return (

    <div className='mainContainer'>

      <NavBar />

      <div className='container-lg'>

        <div className='titleContainer'>
          <h1 className="fs-1">Cooptations</h1>
        </div>

        <div className='selectContainer'>
          <select value={referralDate} onChange={handleSelectFilteredDate} className="custom-form-select mr-2" aria-label="Default select example">
            <option>Filtrer par date</option>
            {addDateFilteredList}
          </select>
          {filterPerOfferOwner}
          {filterPerRecipient}
          <select value={referralCoopted} onChange={handleSelectFilteredReferral} className="custom-form-select mr-2" aria-label="Default select example">
            <option>Filtrer par coopté</option>
            {referralFilteredList}
          </select>
          <select value={referralStatus} onChange={handleSelectFilteredStatus} className="custom-form-select mr-2" aria-label="Default select example">
            <option>Filtrer par statut</option>
            {statusFilteredList}
          </select>
          <button onClick={handleSelectResetFilters} className='custom-btn-style'><RotateLeftOutlinedIcon /></button>
        </div>

        <div className='tableContainer'>
          <Referrals
            currentReferrals={currentReferrals}
            loading={loading}
            handleSelectStatusChange={handleSelectStatusChange}
            handleDeleteReferral={handleDeleteReferral}
          />
        </div>

        <div className='perPageContainer'>
          <select className="custom-form-select" defaultValue={referralsPerPage} onChange={handleSelectPerPage} aria-label="Default select example">
            <option value="10">10 lignes par page</option>
            <option value="25">25 lignes par page</option>
            <option value="50">50 lignes par page</option>
            <option value="100">100 lignes par page</option>
          </select>
        </div>

        <div className='paginationContainer'>
          <Pagination
            ItemsPerPage={referralsPerPage}
            totalItems={referrals.length}
            paginate={paginate}
            handlePrevBtn={handlePrevBtn}
            handleNextBtn={handleNextBtn}
            maxPageNumberLimit={maxPageNumberLimit}
            minPageNumberLimit={minPageNumberLimit}
            currentPage={currentPage}
            items={referrals}
          />
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

export default connect(
  mapStateToProps,
  null
)(ReferralsList);


