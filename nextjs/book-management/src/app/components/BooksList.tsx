"use client";
import { getBooks } from "@/actions/client/book";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function BooksList() {
    const { data } = useQuery({
        queryKey: ["books"],
        queryFn: getBooks,
    });

    return (
        <ul>
            {data?.map((book) => (
                <li key={book._id}>{book.title}</li>
            ))}
        </ul>
    );
}
