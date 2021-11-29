import React from "react";
import { Link } from "react-router-dom";
import apiService from '../services/apiService';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = { product: { } };
    }

    componentDidMount() {
        const {
            match: {
                params: { id }
            }
        } = this.props;

        apiService.getProduct(id)
            .then(response => this.setState({ product: response }))
            .catch(() => this.props.history.push("/products"));
    }

    render() {
        const { product } = this.state;

        return (
            <React.Fragment>
                <div className="py-5">
                    <main className="container">
                        <div className="position-relative d-flex align-items-center justify-content-center">
                            <table cellPadding="7" border="2" width="100%">
                                <thead>
                                     <tr>
                                         <th>Product Code</th>
                                         <th>Product name</th>
                                         <th>Price</th>
                                     </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{product.product_code}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}&nbsp;€</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br/>
                        <div className='alert alert-warning'>
                            <h3>Promotion from our company!</h3>
                            <p>Buy-one-get-one-free offers and green tea.</p>
                            {product.product_code == 'SR1' && <p>
                                If you buy 3 or more strawberries, the price will drop to 4.50€.
                            </p>}
                            {product.product_code == 'CF1' && <p>
                                If you buy 3 or more coffees, the price of all coffees will drop to 2/3 of the original price.
                            </p>}
                        </div>
                        <div className="container py-5">
                            <Link to="/products" className="btn btn-lg btn-secondary">
                                Back to products
                            </Link>
                        </div>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

export default Product;