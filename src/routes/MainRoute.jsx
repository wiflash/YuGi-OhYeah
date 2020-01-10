import React from "react";
import {Provider} from "unistore/react";
import {store} from "../Store";
import {Route, Switch, BrowserRouter} from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Deck from "../pages/Deck";


class MainRoute extends React.Component {
    render(){
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/login" component={Login} />
                        <Route path="/deck" component={Deck} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default MainRoute;