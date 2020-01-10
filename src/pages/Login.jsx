import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions} from "../Store";
import {Container, Row, Form, Button, ListGroup, Image} from 'react-bootstrap';
import NavigationBar from "../components/navbar";
import logo from '../../public/logo512.png';


class Login extends React.Component {
    login = () => {
        const data = {
            username: this.props.username,
            password: this.props.password
        }
        axios.post("https://login-uhuy.free.beeceptor.com/login", data)
        .then((response) => {
            if (response.data.hasOwnProperty("apiKey")) {
                this.props.setUserData(response.data);
                this.props.history.push("/");
            }
        })
        .catch((error) => console.log(error));
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar {...this.props}/>
                <Container fluid={true}>
                    <Container className="mt-5">
                        <Row>
                            <ListGroup className="mx-auto">
                                <ListGroup.Item>
                                    <Form onSubmit={event => event.preventDefault()} className="text-center">
                                        <Form.Group>
                                            <Image fluid width="50%" src={logo} alt="logo"/>
                                        </Form.Group>
                                        <Form.Group className="text-left">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" placeholder="Masukan username"
                                                name="username" onChange={(event) => this.props.handleSetGlobal(event)}/>
                                        </Form.Group>
                                        <Form.Group className="text-left">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Masukan password"
                                                name="password" onChange={(event) => this.props.handleSetGlobal(event)}/>
                                        </Form.Group>
                                        <Button variant="outline-info" type="submit" onClick={() => this.login()}>
                                            Sign in
                                        </Button>
                                    </Form>
                                </ListGroup.Item>
                            </ListGroup>
                        </Row>
                    </Container>
                </Container>
            </React.Fragment>
        )
    }
}


export default connect("username, password", actions)(withRouter(Login));