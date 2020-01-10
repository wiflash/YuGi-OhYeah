import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../Store";
import NavigationBar from "../components/navbar";
import {Container, Row, Col, InputGroup, Form, FormControl, Button} from "react-bootstrap";


class Home extends React.Component {
    checkIsLogin() {
        if (localStorage.getItem("isLogin") === null) {
            this.props.history.push("/login");
        }
    }

    handleSubmit(event) {
        alert('A value was submitted: ' + this.props.budget);
        event.preventDefault();
    }
    
    render() {
        this.checkIsLogin();
        return (
            <React.Fragment>
                <NavigationBar {...this.props}/>
                <Container fluid className="my-5">
                    <Container>
                        <Row>
                            <Col xs="8" className="mx-auto">
                                <Form className="my-5" onSubmit={(event) => this.handleSubmit(event)}>
                                    <InputGroup>
                                        <FormControl
                                            placeholder="Enter your budget" name="budget"
                                            value={this.props.budget} onChange={this.props.handleSetGlobal}
                                        />
                                        <InputGroup.Append>
                                            <Button variant="outline-info" type="submit">
                                                Get Set!
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Container>
                <p className="h3 text-center font-weight-bold">
                    Home page
                </p>
            </React.Fragment>
        );
    }
}


export default connect("budget", actions)(withRouter(Home));