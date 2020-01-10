import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../Store";
import NavigationBar from "../components/navbar";


class Home extends React.Component {
    checkIsLogin() {
        if (localStorage.getItem("isLogin") === null) {
            this.props.history.push("/login");
        }
    }

    render() {
        this.checkIsLogin();
        return (
            <React.Fragment>
                <NavigationBar {...this.props}/>
                <p className="h3 text-center font-weight-bold">
                    Home page
                </p>
            </React.Fragment>
        );
    }
}


export default connect(actions)(withRouter(Home));