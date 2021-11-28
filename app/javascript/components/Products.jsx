import React from "react";
import { Link } from "react-router-dom";
import CurrencyFormat from 'react-currency-format';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        const url = "/api/v1/products";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({ products: response }))
            .catch(() => this.props.history.push("/"));
    }

    addToCart(product_id) {
        const url = "/api/v1/cart";

        const body = {
            product_id: product_id
        };

        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "PUT",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.props.history.push(`/products`))
            .catch(error => console.log(error.message));
    }

    render() {
        const { products } = this.state;
        const allProducts = products.map((product, index) => (
            <div key={index} className="col-md-6 col-lg-4">
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">
                            <span className='left'>{product.name}</span>
                            <span className='right'><CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} suffix={' €'} /></span>
                        </h5>
                        <br/>
                        <Link to={`/products/${product.id}`} className="btn custom-button left">
                            View Product
                        </Link>
                        <a className="btn btn-success right" onClick={() => this.addToCart(product.id)}>Add to cart</a>
                    </div>
                </div>
            </div>
        ));

        return (
            <React.Fragment>
                <section className="jumbotron jumbotron-fluid text-center">
                    <div className="container py-5">
                        <h1 className="display-4">Products for every occasion</h1>
                        <p className="lead text-muted">
                            We have pulled together our most popular products for you.
                        </p>
                    </div>
                </section>
                <div className="py-5">
                    <main className="container">
                        <div className="row">
                            { allProducts }
                        </div>
                        <Link to="/" className="btn btn-link">
                            Home
                        </Link>
                        <div className="text-right mb-3 right">
                            <Link to="/cart" className="btn btn-lg btn-info">
                                Got to cart
                            </Link>
                        </div>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}
export default Products;