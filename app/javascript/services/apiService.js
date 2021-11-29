import fetch from 'node-fetch';

const getProducts = () => {
    const url = "/api/v1/products";

    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
};

const getCart = () => {
    const url = `/api/v1/cart`;

    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
}

const addToCart = (product_id) => {
    const url = "/api/v1/cart";
    const body = { product_id: product_id };
    const token = document.querySelector('meta[name="csrf-token"]').content;

    return fetch(url, {
        method: "PUT",
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
    })
}

const removeProductFromCart = (product_id) => {
    const url = `/api/v1/cart/${product_id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    return fetch(url, {
        method: "DELETE",
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
    })
}

const createPurchase = (products) => {
    const url = "/api/v1/purchases";
    const body = {
        products: products.map(p => ({ id: p.id, quantity: p.quantity, price: p.price }))
    };
    const token = document.querySelector('meta[name="csrf-token"]').content;

    return fetch(url, {
        method: "POST",
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
    })
}

const getProduct = (product_id) => {
    const url = `/api/v1/products/${product_id}`;

    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
}

const getPurchases = () => {
    const url = "/api/v1/purchases";

    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
}

export default {
    getProducts, getProduct, getCart, addToCart, removeProductFromCart, getPurchases, createPurchase
};

