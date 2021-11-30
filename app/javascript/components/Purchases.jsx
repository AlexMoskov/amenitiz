import React from "react";
import { Link } from "react-router-dom";
import apiService from '../services/apiService';

class Purchases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchases: []
        };
    }

    componentDidMount() {
        apiService.getPurchases()
            .then(response => this.setState({ purchases: response.purchases }))
            .catch(() => this.props.history.push("/"));
    }

    allPurchases() {
        const { purchases } = this.state;
        const allPurchases = purchases.map((purchase, index) => (
            <div key={index} className="col-md-12 col-lg-12">
                <div className="card mb-4">
                    <div className="card-body"><strong>Products: </strong>
                        { purchase.products.map((product, i) => (
                            <span key={i} title={product.name}>{product.product_code}&nbsp;</span> ))}&nbsp;
                        <span className='right'><strong>Total price:</strong>&nbsp;{purchase.total}&nbsp;€</span>
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
        return (
            <React.Fragment>
                <section className="jumbotron jumbotron-fluid text-center">
                    <div className="container py-5">
                        <h1 className="display-4">Your purchases</h1>
                        <p className="lead text-muted">
                            A list of your recent purchases.
                        </p>
                    </div>
                </section>
                <div className="py-5">
                    <main className="container">
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
