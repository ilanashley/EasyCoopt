import React from 'react'
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

function Referrals(props) {

    if (props.loading) {
        return <h2>Loading...</h2>
    }

    const referralsList = props.currentReferrals.map((referral, i) => {

        let selectStyle
        if (referral.referralStatus === '1') {
            selectStyle = { border: 'solid 1px blue' }
        } else if (referral.referralStatus === '2') {
            selectStyle = { border: 'solid 1px green' }
        } else if (referral.referralStatus === '3') {
            selectStyle = { border: 'solid 1px red' }
        }

        return (
            <tr>
                <th scope="row">{i + 1}</th>
                <td>{referral.referralCreationDate}</td>
                <td>{referral.recipientLastName}</td>
                <td>{referral.offerBonusAmount}€</td>
                <td>{referral.referralLastName}</td>
                <td>{referral.referralReason}</td>
                <td>{referral.offerTitle}</td>
                <td><AssignmentOutlinedIcon style={{cursor: 'pointer'}}/></td>
                <td>
                    <select value={referral.referralStatus} className="form-select" onChange={(e) => props.handleSelectStatusChange(e, i)} aria-label="Default select example" style={selectStyle}>
                        <option value="1">En attente</option>
                        <option value="2">Approuvé</option>
                        <option value="3">Refusé</option>
                    </select>
                </td>
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
                </tr>
            </thead>
            <tbody>
                {referralsList}
            </tbody>
        </table>
        
        
    )
}

export default Referrals