import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../Store";
import {Navbar, Nav} from 'react-bootstrap';
import logo from '../../public/logo512.png';


class NavigationBar extends React.Component {
    handleAuth = menu => {
        if (menu === "Logout") {
            localStorage.removeItem("isLogin");;
            this.props.history.push("/");
        } else if (menu === "Home") {
            this.props.history.push("/");
        } else {
            this.props.history.push(`/${menu}`)
        }
    }

    render() {
        const auth = localStorage.getItem("isLogin") ? ["Home", "Profile", "Deck", "Logout"]
            : ["Home", "Profile", "Deck", "Login"]
        const authMenu = auth.map(authElement => {
            return (
                <Nav.Link onClick={() => this.handleAuth(authElement)}>
                    {authElement}
                </Nav.Link>
            )
        });
        
        return (
            <Navbar expand="lg" bg="light">
                <Nav className="mr-auto">
                    <Navbar.Brand href="/">
                        <img src={logo} width="50" height="50" className="d-inline-block align-center" alt="logo"/>
                        <span>Yu-Gi Oh-Yeah</span>
                    </Navbar.Brand>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        {authMenu}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}


export default connect(actions)(withRouter(NavigationBar));