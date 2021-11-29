import React from "react";
import { Link } from "react-router-dom";
import apiService from '../services/apiService';
import CurrencyFormat from 'react-currency-format';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            message: null,
            error: null
        };
    }

    componentDidMount() {
        apiService.getProducts()
            .then(response => this.setState({ products: response }))
            .catch(() => this.props.history.push("/"));
    }

    addToCart(product_id) {
        apiService.addToCart(product_id)
            .then(response => {
                this.setState({ message: true, error: null })
            })
            .catch(error => console.log(error.message));
    }

    render() {
        const { products, message } = this.state;
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
                        {message && <div className="alert alert-success alert-dismissible fade show" role="alert">
                            The product has been successfully added to your cart.
                        </div>}

                        <div className="row">
                            { allProducts }
                        </div>
                        <Link to="/" className="btn btn-lg btn-secondary">
                            Back home
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