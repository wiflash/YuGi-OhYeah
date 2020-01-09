import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../Store";


class Deck extends React.Component {
    render() {
        return (
            <p className="h3 text-center font-weight-bold">
                Deck page
            </p>
        );
    }
}


export default connect(actions)(withRouter(Deck));