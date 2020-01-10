import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../Store";
import PageInitScrap from "./scrpe";
import NavigationBar from "../components/navbar";
import {Container, Row, Col, InputGroup, Form, FormControl, Button} from "react-bootstrap";


class Deck extends React.Component {
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
                <Container fluid className="my-5">
                    <Container>
                        <Row>
                            <PageInitScrap />
                        </Row>
                    </Container>
                </Container>
            </React.Fragment>
        );
    }
}


export default connect(actions)(withRouter(Deck));