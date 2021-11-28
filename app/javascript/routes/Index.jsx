import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Products from "../components/Products";
import Product from "../components/Product";
import Cart from "../components/Cart";

export default (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/products" component={Products}/>
            <Route exact path="/products/:id" component={Product}/>
            <Route exact path="/cart" component={Cart}/>
        </Switch>
    </Router>
);