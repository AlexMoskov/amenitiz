import React from "react";
import { Link } from "react-router-dom";
import apiService from '../services/apiService';

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
        apiService.getCart()
            .then(response => this.setState({ products: response.products, price: response.price }))
            .catch(() => this.props.history.push("/products"));
    }

    removeProduct(product_id) {
       apiService.removeProductFromCart(product_id)
            .then(response => {
                this.setState({ message: true, error: null })
                this.refreshCart();
            })
            .catch(error => console.log(error.message));
    }

    createPurchase() {
        const { products } = this.state;
        apiService.createPurchase(products)
            .then(response => this.props.history.push(`/purchases`))
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
                            <span className='right'>{product.price}&nbsp;€</span>
                        </h5>
                        <br/>
                        <div className="row">
                            <div className="col-md-6 col-lg-6">
                                <span className="btn-success left">Qty: {product.quantity}</span>
                            </div>
                            <div className="col-md-6 col-lg-6">
                                <span className="right">Total: {product.total}&nbsp;€</span>
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
                                <a className="btn btn-lg btn-info" onClick={() => this.createPurchase()}>Buy</a>
                            </div>
                        </div>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

export default Cart;