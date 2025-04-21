import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProductById } from "../api/endpoints/products";
import { useParams } from "react-router";
import useCart from "../hooks/useCart";

export default function ProductDetails() {
    const { addToCart } = useCart();
    const { productId } = useParams();
    const { data, isFetching, isError, error } = useQuery({
        queryKey: ["products", productId],
        queryFn: () => getProductById(productId),
    });
    console.log({ productId });
    if (isFetching) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    const product = data.data || {};

    return (
        <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
            <h2>{product.name}</h2>
            <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />
            <p>{product.description}</p>
            <p>
                <strong>Price : {product.price.current}DZD</strong>
            </p>
            <button
                type="button"
                style={{
                    padding: "10px 20px",
                    background: "green",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                }}
                onClick={() => {
                    addToCart(product);
                    alert("Item added to cart");
                }}
            >
                Add to Cart
            </button>
        </div>
    );
}
