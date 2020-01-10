import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions} from "../Store";
import {Container, Image, Row, ListGroup} from 'react-bootstrap';
import NavigationBar from "../components/navbar";


class Profile extends React.Component {
    checkIsLogin() {
        if (localStorage.getItem("isLogin") === null) {
            this.props.history.push("/login");
        }
    }

    render() {
        const email = localStorage.getItem("email");
        const fullname = localStorage.getItem("fullname");
        const avatar = localStorage.getItem("avatar");
        this.checkIsLogin();
        return (
            <React.Fragment>
                <NavigationBar {...this.props}/>
                <Container fluid={true}>
                    <Container className="mt-5">
                        <Row>
                            <ListGroup horizontal className="mx-auto">
                                <ListGroup.Item variant="secondary" className="text-center">
                                    <Image fluid src={avatar} alt="avatar"/>
                                </ListGroup.Item>
                                <ListGroup.Item className="pr-auto">
                                    <p className="h3 font-weight-bold">Nama: {fullname}</p>
                                    <p>{email}</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Row>
                    </Container>
                </Container>
            </React.Fragment>
        );
    }
};


export default connect(actions)(withRouter(Profile));