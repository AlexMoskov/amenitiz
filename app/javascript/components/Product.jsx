import React from "react";
import { Link } from "react-router-dom";
import CurrencyFormat from 'react-currency-format';

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

        const url = `/api/v1/products/${id}`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({ product: response }))
            .catch(() => this.props.history.push("/products"));
    }

    render() {
        const { product } = this.state;

        return (
            <div className="">
                <div className="hero position-relative d-flex align-items-center justify-content-center">
                    <table cellpadding="7" border="2" width="100%">
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
                                <td><CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} suffix={' €'} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="container py-5">
                    <Link to="/products" className="btn btn-link">
                        Back to products
                    </Link>
                </div>
            </div>
        );
    }
}

export default Product;