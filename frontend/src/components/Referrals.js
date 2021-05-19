import React, {useState} from 'react'
// import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
// import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TransitionModal from './TransitionModal'
import { connect } from 'react-redux'

const Referrals = (props) => {

    // Pagination state
    const [modalShow, setModalShow] = useState(false);

    if (props.loading) {
        return <h2>Loading...</h2>
    }

    let deleteReferralTitle

    // Map pour l'affichage des cooptations
    const referralsList = props.currentReferrals.map((referral, i) => {

        let selectStyle
        let status
        let statusStyle
        
        if (referral.referralStatus === '1') {
            selectStyle = { border: 'solid 1px blue' }
            status = 'En cours'
            statusStyle = { color: 'blue' }
        } else if (referral.referralStatus === '2') {
            selectStyle = { border: 'solid 1px green' }
            status = 'Approuvé'
            statusStyle = { color: 'green' }
        } else if (referral.referralStatus === '3') {
            selectStyle = { border: 'solid 1px red' }
            status = 'Refusé'
            statusStyle = { color: 'red' }
        }

        // Conditions sur l'affichage du status de la cooptation en fonction du type de l'utilisateur
        let type = true
        let referralStatus
        let deleteReferralButton
        if (type === true) {
            referralStatus = <select value={referral.referralStatus} className="form-select" onChange={(e) => props.handleSelectStatusChange(e, i, referral.referralId)} aria-label="Default select example" style={selectStyle}>
                                    <option value="1">En cours</option>
                                    <option value="2">Approuvé</option>
                                    <option value="3">Refusé</option>
                                </select>
        } else if (type === false) {
            referralStatus = <div style ={statusStyle}>{status}</div>
            deleteReferralTitle = <th>Supp</th>
            deleteReferralButton = <td><DeleteOutlineIcon style={{cursor: 'pointer'}} onClick={() => props.handleDeleteReferral(referral.referralId)}/></td>
        }

        return (
            <tr>
                <th scope="row">{i + 1}</th>
                <td>{referral.referralCreationDate}</td>
                <td>{referral.recipientLastName}</td>
                <td>{referral.offerBonusAmount}€</td>
                <td>{referral.referralLastName}</td>
                <td><div className='d-flex'><TransitionModal modalTitle={'Recommandation'} modalDescription={referral.referralReason} modalIcon={'VisibilityOutlinedIcon'}/></div></td>
                <td>{referral.offerTitle}</td>
                <td><div className='d-flex'><TransitionModal modalTitle={'Curriculum vitae'} modalDescription={'Le cv a aller chercher sur cloudinary !!!'} modalIcon={'AssignmentOutlinedIcon'}/></div></td>
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
                    <th>Bénéficiaire</th>
                    <th>Récompense</th>
                    <th>Coopté</th>
                    <th>Recommandation</th>
                    <th>Offre</th>
                    <th>Cv</th>
                    <th>Status</th>
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
    console.log(state)
    return { 
      token: state.token,
      type: state.type 
    };
  }
  
  export default connect(
    mapStateToProps, 
    null
  )(Referrals);
