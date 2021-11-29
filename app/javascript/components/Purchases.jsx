import React from "react";
import { Link } from "react-router-dom";
import CurrencyFormat from 'react-currency-format';

class Purchases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchases: []
        };
    }

    componentDidMount() {
        const url = "/api/v1/purchases";
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({ purchases: response.purchases }))
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
                    this.setState({ message: true, error: null })
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.props.history.push(`/products`))
            .catch(error => console.log(error.message));
    }

    allPurchases() {
        const { purchases } = this.state;
        const allPurchases = purchases.map((purchase, index) => (
            <div key={index} className="col-md-12 col-lg-12">
                <div className="card mb-4">
                    <div className="card-body"><strong>Products: </strong>
                        { purchase.products.map((product, i) => (
                            <span key={i} title={product.name}>{product.product_code}&nbsp;</span> ))} &nbsp;
                        <span className='right'><strong>Total price: </strong><CurrencyFormat value={purchase.total} displayType={'text'} thousandSeparator={true} suffix={' €'}/></span>
                    </div>
                </div>
            </div>
        ));

        return (
            <React.Fragment>
                {allPurchases}
            </React.Fragment>
        );
    }

    render() {
        const { message } = this.state;

        return (
            <React.Fragment>
                <section className="jumbotron jumbotron-fluid text-center">
                    <div className="container py-5">
                        <h1 className="display-4">Your purchases</h1>
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
                            { this.allPurchases() }
                        </div>
                        <Link to="/" className="btn btn-lg btn-secondary">
                            Back home
                        </Link>
                        <div className="text-right mb-3 right">
                            <Link to="/products" className="btn btn-lg btn-info">
                                Got to Products
                            </Link>
                        </div>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}
export default Purchases;
