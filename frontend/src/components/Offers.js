import React from 'react'
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import PlaceIcon from '@material-ui/icons/Place';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux'

const Offers = (props) => {

    if (props.loading) {
        return <h2>Loading...</h2>
    }

    // Map pour l'affichage des offres
    const offersList = props.currentOffers.map((offer, i) => {

        // Days since offer's creation date
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date(offer.creationDate);
        const secondDate = new Date();
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

        var display = {};
        if (props.ajoutId.includes(offer._id)) {
            display = { display: 'none' }
        }
        return (
            <div key={offer._id} className="cardBackground mb-2" style={display}>
                <li className="d-flex flex-column flex-md-row align-items-center justify-content-around">
                    <h4>{offer.title}</h4>
                    <div className="cardInfoBg">
                        <span className="d-flex justify-content-center">
                            <div className="cardInfoIcons">
                                <CalendarTodayIcon fontSize="large" />
                                <p>Il y a {diffDays} jours</p>
                            </div>
                            <div className="cardInfoIcons">
                                <BusinessCenterIcon fontSize="large" />
                                <p>{offer.contract}</p>
                            </div>
                            <div className="cardInfoIcons">
                                <PlaceIcon fontSize="large" />
                                <p>{offer.city}</p>
                            </div>
                        </span>
                    </div>
                    <h3>{offer.bonusAmount}€</h3>
                    <button id="referralButton">Recommander</button>
                    <button>
                        <DeleteIcon onClick={() => { props.archiveOffer(offer._id) }} />
                    </button>
                    <button id="enlargeButton">
                        <OpenInNewIcon />
                    </button>
                </li>
            </div>
        )
    })

    return (

        <div>
            {offersList}
        </div>

    )
}

function mapStateToProps(state) {
    return {
        token: state.token,
        typeId: state.typeId
    };
}

export default connect(
    mapStateToProps,
    null
)(Offers);
