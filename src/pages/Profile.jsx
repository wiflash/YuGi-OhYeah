import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions} from "../Store";
import {Container, Image, Row, ListGroup} from 'react-bootstrap';
import NavigationBar from "../components/navbar";


class Profile extends React.Component {
    checkIsLogin() {
        if (this.props.isLogin === false) {
            this.props.history.push("/login");
        }
    }

    render() {
        this.checkIsLogin();
        return (
            <React.Fragment>
                <NavigationBar {...this.props}/>
                <Container fluid={true}>
                    <Container className="mt-5">
                        <Row>
                            <ListGroup horizontal className="mx-auto">
                                <ListGroup.Item variant="secondary" className="text-center">
                                    <Image fluid src={this.props.avatar} alt={this.props.avatar}/>
                                </ListGroup.Item>
                                <ListGroup.Item className="pr-auto">
                                    <p className="h3 font-weight-bold">Nama: {this.props.username}</p>
                                    <p>{this.props.email}</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Row>
                    </Container>
                </Container>
            </React.Fragment>
        );
    }
};


export default connect("username, avatar, email, isLogin",actions)(withRouter(Profile));