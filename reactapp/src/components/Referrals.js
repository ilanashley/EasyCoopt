import React from 'react'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TransitionModal from './TransitionModal'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";

const Referrals = (props) => {

    if (props.loading) {
        return <h2>Chargement...</h2>
    }

    // Capitalize function
    const capitalize = (arg) => {
        if (typeof arg !== 'string') return ''
        return arg.charAt(0).toUpperCase() + arg.slice(1)
    }

    let deleteReferralTitle

    // Map pour l'affichage des cooptations
    const referralsList = props.currentReferrals.map((referral, i) => {

        // Manipulation date
        var myDate = new Date(referral.creationDate)
        var myDateString = ('0' + myDate.getDate()).slice(-2) + '/'
        + ('0' + (myDate.getMonth()+1)).slice(-2) + '/'
        + myDate.getFullYear();


        let selectStyle
        let status
        let statusStyle
        
        if (referral.status === '1') {
            selectStyle = { border: 'solid 1px blue' }
            status = 'En cours'
            statusStyle = { color: 'blue' }
        } else if (referral.status === '2') {
            selectStyle = { border: 'solid 1px green' }
            status = 'Approuvé'
            statusStyle = { color: 'green' }
        } else if (referral.status === '3') {
            selectStyle = { border: 'solid 1px red' }
            status = 'Refusé'
            statusStyle = { color: 'red' }
        }

        // Conditions sur l'affichage du status de la cooptation en fonction du type de l'utilisateur
        let referralStatus
        let deleteReferralButton
        if(!props.group){
            return <Redirect to="/myaccount" />;
        } else if (props.group.toLowerCase() === 'recruteur') {
            referralStatus = <select value={referral.status} className="form-select" onChange={(e) => props.handleSelectStatusChange(e, i, referral._id)} aria-label="Default select example" style={selectStyle}>
                                    <option value="1">En cours</option>
                                    <option value="2">Approuvé</option>
                                    <option value="3">Refusé</option>
                                </select>
        } else if (props.group.toLowerCase() === 'coopteur') {
            referralStatus = <div style ={statusStyle}>{status}</div>
            deleteReferralTitle = <th>Supp</th>
            deleteReferralButton = <td><DeleteOutlineIcon style={{cursor: 'pointer'}} onClick={() => props.handleDeleteReferral(referral._id, referral.offerId._id)}/></td>
        }

        return (
            <tr>
                <th scope="row">{i + 1}</th>
                <td>{myDateString}</td>
                <td>{referral.offerId.userId.lastName}</td>
                <td>{capitalize(referral.userId.lastName)}</td>
                <td>{capitalize(referral.lastName)}</td>
                <td>{referral.offerId.title}</td>
                <td>{referral.offerId.bonusAmount}€</td>
                <td><div className='d-flex'><TransitionModal modalTitle={'Recommandation'} modalDescription={referral.reason} modalIcon={'VisibilityOutlinedIcon'}/></div></td>
                <td><div className='d-flex'><TransitionModal modalTitle={'Curriculum vitae'} referralResumeUrl={referral.resumeUrl} modalIcon={'AssignmentOutlinedIcon'}/></div></td>
                <td>
                    {referralStatus}
                </td> 
                {deleteReferralButton}              
            </tr>
        )
    })
    
    return (
        
        <table className='table table-light table-hover'>
            <thead>
                <tr>
                    <th></th>
                    <th>Ajouté le</th>
                    <th>Recruteur</th>
                    <th>Coopteur</th>
                    <th>Coopté</th>
                    <th>Offre</th>
                    <th>Récompense</th>
                    <th>Recommandation</th>
                    <th>Cv</th>
                    <th>Statut</th>
                    {deleteReferralTitle}
                </tr>
            </thead>
            <tbody>
                {referralsList}
            </tbody>
        </table>
                         
    )
}

function mapStateToProps(state) {
    return { 
      group: state.group 
    };
  }
  
  export default connect(
    mapStateToProps, 
    null
  )(Referrals);
