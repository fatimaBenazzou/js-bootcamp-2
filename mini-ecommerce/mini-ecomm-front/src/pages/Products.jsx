import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProducts } from "../api/endpoints/products";
import { useNavigate } from "react-router";

export default function Products() {
    const navigate = useNavigate();
    const { data, isFetching, isError, error, refetch } = useQuery({
        queryFn: getProducts,
        queryKey: ["products"],
    });

    if (isFetching) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    console.log({ data });
    const products = data.data;

    return (
        <section>
            <div>
                <h2>Products</h2>
                <button
                    onClick={() => {
                        refetch();
                    }}
                >
                    refetch
                </button>
            </div>
            <ul>
                {products.map((product) => (
                    <li key={product._id} onClick={() => navigate(`${product._id}`)}>
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>
                            <strong>{product.price.current}DZD</strong>{" "}
                            <del>{product.price.original}DZD</del>
                        </p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
