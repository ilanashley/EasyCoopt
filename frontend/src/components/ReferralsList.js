import React, { useState, useEffect } from 'react';
import '../App.css';
import Referrals from './Referrals';
import Pagination from './Pagination';
import NavBar from './NavBar'

export default function ReferralsList(props) {

  const referralsArray = [
    { addDate: '12/03/2021', recipientName: 'alex', reward: 500, referralName: 'Dupont', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '05/12/2020', recipientName: 'joseph', reward: 400, referralName: 'Duchemin', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '09/11/2020', recipientName: 'ilana', reward: 500, referralName: 'Duprès', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: "3" },
    { addDate: '21/09/2020', recipientName: 'mathieu', reward: 600, referralName: 'Dumont', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '25/08/2020', recipientName: 'ilana', reward: 500, referralName: 'Deloin', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: "2" },
    { addDate: '12/03/2021', recipientName: 'mathieu', reward: 300, referralName: 'Leboucher', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '09/11/2020', recipientName: 'joseph', reward: 200, referralName: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: "3" },
    { addDate: '07/06/2020', recipientName: 'joseph', reward: 800, referralName: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: "2" },
    { addDate: '25/08/2020', recipientName: 'mathieu', reward: 250, referralName: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '25/08/2020', recipientName: 'mathieu', reward: 400, referralName: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: "2" },
    { addDate: '21/09/2020', recipientName: 'ilana', reward: 500, referralName: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: "3" },
    { addDate: '27/11/2020', recipientName: 'joseph', reward: 350, referralName: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '05/12/2020', recipientName: 'alex', reward: 700, referralName: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: "3" },
    { addDate: '11/12/2020', recipientName: 'mathieu', reward: 500, referralName: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: "3" },
    { addDate: '01/04/2020', recipientName: 'ilana', reward: 200, referralName: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '03/02/2021', recipientName: 'alex', reward: 520, referralName: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '01/01/2021', recipientName: 'mathieu', reward: 890, referralName: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: "3" },
    { addDate: '21/03/2021', recipientName: 'alex', reward: 500, referralName: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '03/07/2020', recipientName: 'joseph', reward: 400, referralName: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '26/05/2020', recipientName: 'mathieu', reward: 500, referralName: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: "3" },
    { addDate: '31/10/2020', recipientName: 'alex', reward: 600, referralName: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '25/04/2020', recipientName: 'mathieu', reward: 500, referralName: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '2' },
    { addDate: '21/03/2021', recipientName: 'ilana', reward: 300, referralName: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '1' }
  ]

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
  useEffect(() => { 
    function fetchReferrals() {
      setLoading(true)
      // Requete au backend a placer ici
      setReferrals(referralsArray)
      setLoading(false)
    } 
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

  // Status choice per refferal
  const handleSelectStatusChange = (event, i) => {
    console.log(event.target.value)
    let newReferrals = [...referrals]
    let index = i + indexOfFirstReferral
    newReferrals[index].status = event.target.value   
    setReferrals(newReferrals)
  } 

  // Filter per date
  const addDateArray = referrals.map((referral) => {return referral.addDate})
  const addDateFilteredArray = addDateArray.filter((date, pos) => {
    return addDateArray.indexOf(date) === pos;
  })
  const addDateFilteredList = addDateFilteredArray.map((date) => {
    return( <option value={date}>{date}</option> )
  })

  const handleSelectFilteredDate = (event) => {
    const referralsPerDate = referrals.filter(referral => referral.addDate === event.target.value)
    setReferrals(referralsPerDate)
  }

  // Filter per recipient
  const recipientArray = referrals.map((referral) => {return referral.recipientName})
  const recipientFilteredArray = recipientArray.filter((recipient, pos) => {
    return recipientArray.indexOf(recipient) === pos;
  }).sort()
  const recipientFilteredList = recipientFilteredArray.map((recipient) => {
    return( <option value={recipient}>{recipient}</option> )
  })

  const handleSelectFilteredRecipient = (event) => {
    const referralsPerRecipient = referrals.filter(referral => referral.recipientName === event.target.value)
    setReferrals(referralsPerRecipient)
  }

  // Fiter per referral
  const referralArray = referrals.map((referral) => {return referral.referralName})
  const referralFilteredArray = referralArray.filter((referral, pos) => {
    return referralArray.indexOf(referral) === pos;
  }).sort()
  const referralFilteredList = referralFilteredArray.map((referral) => {
    return( <option value={referral}>{referral}</option> )
  })

  const handleSelectFilteredReferral = (event) => {
    const referralsPerReferral = referrals.filter(referral => referral.referralName === event.target.value)
    setReferrals(referralsPerReferral)
  }

  // Filter per status
  const statusArray = referrals.map((referral) => {return referral.status})
  const statusFilteredArray = statusArray.filter((status, pos) => {
    return statusArray.indexOf(status) === pos;
  }).sort()
  const statusFilteredList = statusFilteredArray.map((status) => {
    let statusDescription = status === '1' ? 'En cours' : (status === '2' ? 'Accepté' : 'Refusé')
    return( <option value={status}>{statusDescription}</option> )
  })

  const handleSelectFilteredStatus = (event) => {
    const referralsPerStatus = referrals.filter(referral => referral.status === event.target.value)
    setReferrals(referralsPerStatus)
  }

  // Reset Filters
  const handleSelectResetFilters = () => {
    setReferrals(referralsArray)
  }

  return (

    <div className='mainContainer'>
      
      <NavBar/>

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
          <Referrals currentReferrals={currentReferrals} loading={loading} handleSelectStatusChange={handleSelectStatusChange} />
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
          <Pagination referralsPerPage={referralsPerPage} totalReferrals={referrals.length} paginate={paginate} handlePrevBtn={handlePrevBtn} handleNextBtn={handleNextBtn} maxPageNumberLimit={maxPageNumberLimit} minPageNumberLimit={minPageNumberLimit} currentPage={currentPage} referrals={referrals} />
        </div>

      </div>

    </div>
  );
}


