import React from "react";
import useUser from "../hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { checkUser } from "../api/endpoints/auth";

export default function AuthProvider({ children }) {
    const { setUser } = useUser();

    const { isFetching } = useQuery({
        queryKey: ["user-auth"],
        queryFn: async () => {
            const response = await checkUser();
            if (response && response.data && response.data.data) setUser(response.data.data);
        },
    });

    if (isFetching) return <p>Loading...</p>;

    return children;
}
