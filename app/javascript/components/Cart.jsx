import React from "react";
import { Link } from "react-router-dom";
import CurrencyFormat from 'react-currency-format';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            price: 0.00,
            message: null,
            error: null
        };
    }

    componentDidMount() {
        this.refreshCart();
    }

    refreshCart() {
        const url = `/api/v1/cart`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({ products: response.products, price: response.price }))
            .catch(() => this.props.history.push("/products"));
    }

    removeProduct(product_id) {
        const url = `/api/v1/cart/${product_id}`;
        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    this.setState({ message: true, error: null })
                    this.refreshCart();
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.props.history.push(`/products`))
            .catch(error => console.log(error.message));
    }

    render() {
        const { products, price, message } = this.state;
        const allProducts = products.map((product, index) => (
            <div key={index} className="col-md-6 col-lg-4">
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">
                            <span className='left'>{product.name}</span>
                            <span className='right'><CurrencyFormat value={product.price} displayType={'text'}
                                                                    thousandSeparator={true} suffix={' €'}/></span>
                        </h5>
                        <br/>
                        <div className="row">
                            <div className="col-md-6 col-lg-6">
                                <span className="btn-success left">Qty: {product.quantity}</span>
                            </div>
                            <div className="col-md-6 col-lg-6">
                                <span className="right">Total: {product.total}</span>
                            </div>
                        </div>
                        <br/>
                        <a className="btn btn-danger left" onClick={() => this.removeProduct(product.id)}>Remove</a>
                    </div>
                </div>
            </div>
        ));

        return (
            <React.Fragment>
                <section className="jumbotron jumbotron-fluid text-center">
                    <div className="container py-5">
                        <h1 className="display-4">Your Cart</h1>
                        <p className="lead text-muted">
                            Please check your shopping cart.
                        </p>
                    </div>
                </section>
                <div className="py-5">
                    <main className="container">
                        {message && <div className="alert alert-success alert-dismissible fade show" role="alert">
                            The product has been successfully removed from your cart.
                        </div>}
                        <div className="row">
                            <div className="col-md-12 col-lg-12">
                                { allProducts }
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <Link to="/products" className="btn btn-lg btn-secondary">
                                Back to Products
                            </Link>
                            <div className="text-right mb-3 right">
                                <Link to="/buy" className="btn btn-lg btn-info">
                                    Buy
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

export default Cart;