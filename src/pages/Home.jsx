import React from "react";
import {withRouter} from "react-router-dom";
import {Redirect} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../Store";


class Home extends React.Component {
    render() {
        if (this.props.isLogin === false) {
            return <Redirect to={{ pathname: "/login" }} />;
        } else {
            return (
                <p className="h3 text-center font-weight-bold">
                    Home page
                </p>
            );
        }
    }
}


export default connect("isLogin", actions)(withRouter(Home));