import React, { useState, useEffect } from 'react';
import '../App.css';
import Referrals from './Referrals';
import Pagination from './Pagination';
import NavBar from './NavBar'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";

const ReferralsList = (props) => {

  const [referrals, setReferrals] = useState([]);

  // Pagination states
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [referralsPerPage, setReferralsPerPage] = useState(10);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
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
    setReferrals(response.usersInfo)
    setLoading(false)
  }

  // Fetch backend to delete referral by id
  const handleDeleteReferral = async (referralId) => {
    var rawResponse =  await fetch(`/referrals/delete/${referralId}`, {
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

  // Status choice per referral
  const handleSelectStatusChange = async (event, i, referralId) => {
    let newReferrals = [...referrals]
    let index = i + indexOfFirstReferral
    newReferrals[index].referralStatus = event.target.value
    setReferrals(newReferrals)
    var rawResponse = await fetch('/referrals/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `referralStatus=${event.target.value}&referralId=${referralId}`
    })
    var response = await rawResponse.json()
  }

  // Filter per date
  const addDateArray = referrals.map((referral) => { return referral.referralCreationDate })
  const addDateFilteredArray = addDateArray.filter((date, pos) => {
    return addDateArray.indexOf(date) === pos;
  })
  const addDateFilteredList = addDateFilteredArray.map((date) => {
    return (<option value={date}>{date}</option>)
  })

  const handleSelectFilteredDate = (event) => {
    const referralsPerDate = referrals.filter(referral => referral.referralCreationDate === event.target.value)
    setReferrals(referralsPerDate)
  }

  // Filter per recipient
  const recipientArray = referrals.map((referral) => { return referral.recipientLastName })
  const recipientFilteredArray = recipientArray.filter((recipient, pos) => {
    return recipientArray.indexOf(recipient) === pos;
  }).sort()
  const recipientFilteredList = recipientFilteredArray.map((recipient) => {
    return (<option value={recipient}>{recipient}</option>)
  })

  const handleSelectFilteredRecipient = (event) => {
    const referralsPerRecipient = referrals.filter(referral => referral.recipientLastName === event.target.value)
    setReferrals(referralsPerRecipient)
  }

  // Fiter per referral
  const referralArray = referrals.map((referral) => { return referral.referralLastName })
  const referralFilteredArray = referralArray.filter((referral, pos) => {
    return referralArray.indexOf(referral) === pos;
  }).sort()
  const referralFilteredList = referralFilteredArray.map((referral) => {
    return (<option value={referral}>{referral}</option>)
  })

  const handleSelectFilteredReferral = (event) => {
    const referralsPerReferral = referrals.filter(referral => referral.referralLastName === event.target.value)
    setReferrals(referralsPerReferral)
  }

  // Filter per status
  const statusArray = referrals.map((referral) => { return referral.referralStatus })
  const statusFilteredArray = statusArray.filter((status, pos) => {
    return statusArray.indexOf(status) === pos;
  }).sort()
  const statusFilteredList = statusFilteredArray.map((status) => {
    let statusDescription = status === '1' ? 'En attente' : (status === '2' ? 'Approuvé' : 'Refusé')
    return (<option value={status}>{statusDescription}</option>)
  })

  const handleSelectFilteredStatus = (event) => {
    const referralsPerStatus = referrals.filter(referral => referral.referralStatus === event.target.value)
    setReferrals(referralsPerStatus)
  }

  // Reset Filters
  const handleSelectResetFilters = () => {
    fetchReferrals()
  }

  if(!props.token) {
    return <Redirect to="/login" />;
  }

  return (

    <div className='mainContainer'>

      <NavBar />

      <div className='container-lg'>

        <div className='titleContainer'>
          <h1>Cooptations en cours</h1>
        </div>

        <div className='selectContainer'>
          <select onChange={handleSelectFilteredDate} className="custom-form-select mr-2" aria-label="Default select example">
            <option selected>Filtrer par date</option>
            {addDateFilteredList}
          </select>
          <select onChange={handleSelectFilteredRecipient} className="custom-form-select mr-2" aria-label="Default select example">
            <option selected>Filtrer par bénéficiaire</option>
            {recipientFilteredList}
          </select>
          <select onChange={handleSelectFilteredReferral} className="custom-form-select mr-2" aria-label="Default select example">
            <option selected>Filtrer par coopté</option>
            {referralFilteredList}
          </select>
          <select onChange={handleSelectFilteredStatus} className="custom-form-select mr-2" aria-label="Default select example">
            <option selected>Filtrer par status</option>
            {statusFilteredList}
          </select>
          <button onClick={handleSelectResetFilters} className='custom-btn-style'>Supprimer</button>
        </div>

        <div className='tableContainer'>
          <Referrals currentReferrals={currentReferrals} loading={loading} handleSelectStatusChange={handleSelectStatusChange} handleDeleteReferral={handleDeleteReferral} />
        </div>

        <div className='perPageContainer'>
          <select className="custom-form-select" defaultValue={referralsPerPage} onChange={handleSelectPerPage} aria-label="Default select example">
            <option value="10">10 par page</option>
            <option value="20">20 par page</option>
            <option value="30">30 par page</option>
            <option value="40">40 par page</option>
          </select>
        </div>

        <div className='paginationContainer'>
          <Pagination ItemsPerPage={referralsPerPage} totalItems={referrals.length} paginate={paginate} handlePrevBtn={handlePrevBtn} handleNextBtn={handleNextBtn} maxPageNumberLimit={maxPageNumberLimit} minPageNumberLimit={minPageNumberLimit} currentPage={currentPage} items={referrals} />
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
)(ReferralsList);


