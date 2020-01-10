import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../Store";
import NavigationBar from "../components/navbar";
import Yugi from "../components/getCardList";
import {Container, Row, Col, InputGroup, Form, FormControl, Button} from "react-bootstrap";


class Home extends React.Component {
    checkIsLogin() {
        if (localStorage.getItem("isLogin") === null) {
            this.props.history.push("/login");
        }
    }

    convertToDollar() {
        store.setState({isLoading: true});
        axios.get("https://api.exchangeratesapi.io/latest?base=IDR&symbols=USD")
        .then((response) => {
            const rate = response.data.rates.USD;
            store.setState({
                budgetDollar: Math.round(rate*this.props.budget*100)/100,
                isLoading: false
            });
        })
    }

    getFilteredCardList() {
        store.setState({isLoading: true});
        axios.get("https://db.ygoprodeck.com/api/v5/cardsets.php")
        .then((response) => {
            store.setState({
                cards: response.data.filter((eachSet) => eachSet["Number of Cards"] >= 50)
                        .sort((a, b) => b["Number of Cards"]-a["Number of Cards"]),
                isLoading: false
            });
        })
    }

    handleSubmit(event) {
        store.setState({budget: parseFloat(this.props.budget)});
        this.convertToDollar();
        this.getFilteredCardList();
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
                                            <Button variant="light" className="text-info" type="submit">
                                                Get Set!
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </React.Fragment>
        );
    }
}


export default connect("budget, budgetDollar, cards", actions)(withRouter(Home));