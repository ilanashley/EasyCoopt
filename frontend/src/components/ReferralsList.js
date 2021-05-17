import React, { useState, useEffect } from 'react';
import '../App.css';
import Referrals from './Referrals';
import Pagination from './Pagination';
import NavBar from './NavBar'

export default function ReferralsList(props) {

  const referralsArray = [
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 400, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: "3" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 600, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: "2" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 300, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 200, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: "3" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 800, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: "2" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 250, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 400, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: "2" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: "3" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 350, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 700, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: "3" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: "3" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 200, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 520, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 890, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: "3" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 400, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: "3" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 600, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: "1" },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '2' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 300, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 200, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 800, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '2' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 250, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 400, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '2' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 350, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 700, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 200, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 520, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 890, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 400, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 600, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '2' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 300, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 200, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 800, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '2' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 250, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 400, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '2' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 350, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 700, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 360, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '4' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 200, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 520, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 890, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 400, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 600, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '2' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 300, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 200, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 800, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '2' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 250, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 400, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '2' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 350, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 700, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 200, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 520, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 890, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 400, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 600, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '2' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 300, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 200, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 800, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '2' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 250, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 400, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '2' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 350, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 700, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 200, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 520, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 890, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 400, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 600, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '2' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 300, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 200, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 800, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '2' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 250, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 400, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Senior', resumeUrl: 'CvUrl', status: '2' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 350, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Backend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 700, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 500, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '3' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 200, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 520, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Frontend', resumeUrl: 'CvUrl', status: '1' },
    { addDate: '../../...', recipient: 'nom du coopteur', reward: 890, name: 'nom du coopté', recommandation: 'il est super génial', offer: 'Web Developper Junior', resumeUrl: 'CvUrl', status: '3' }
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

  useEffect(() => {
    function fetchReferrals() {
      setLoading(true)
      // Requete au backend a placer ici
      setReferrals(referralsArray)
      setLoading(false)
    }
    fetchReferrals()
  }, [])

  // Change page
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

  const handleSelectPerPageChange = (event) => {
    setReferralsPerPage(event.target.value)
  }

  const handleSelectStatusChange = (event, i) => {
    let newReferrals = [...referrals]
      let index = i + indexOfFirstReferral
      newReferrals[index].status = event.target.value
    
    setReferrals(newReferrals)
  } 

  return (

    <div className='mainContainer'>
      
      <NavBar/>

      <div className='container-lg'>

        <div className='titleContainer'>
          <h1>Cooptations en cours</h1>
        </div>

        <div className='selectContainer'>
          <select className="custom-form-select mr-2" aria-label="Default select example">
            <option selected>Filtrer par date</option>
            <option value="1">Date 1</option>
            <option value="2">Date 2</option>
            <option value="3">Date 3</option>
          </select>
          <select className="custom-form-select mr-2" aria-label="Default select example">
            <option selected>Filtrer par bénéficiaire</option>
            <option value="1">Coopteur 1</option>
            <option value="2">Coopteur 2</option>
            <option value="3">Coopteur 3</option>
          </select>
          <select className="custom-form-select mr-2" aria-label="Default select example">
            <option selected>Filtrer par coopté</option>
            <option value="1">Coopté 1</option>
            <option value="2">Coopté 2</option>
            <option value="3">Coopté 3</option>
          </select>
          <select className="custom-form-select mr-2" aria-label="Default select example">
            <option selected>Filtrer par status</option>
            <option value="current">En attente</option>
            <option value="approved">Aprouvé</option>
            <option value="refused">Refusé</option>
          </select>
          <button className='custom-btn-style'>X</button>
        </div>

        <div className='tableContainer'>
          <Referrals currentReferrals={currentReferrals} loading={loading} handleSelectStatusChange={handleSelectStatusChange} />
        </div>

        <div className='perPageContainer'>
          <select className="custom-form-select" defaultValue={referralsPerPage} onChange={handleSelectPerPageChange} aria-label="Default select example">
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


