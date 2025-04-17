import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../app/slices/userSlice";

export default function useUser() {
    const { user, isAdmin, isLoggedIn } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    return {
        user,
        isAdmin,
        isLoggedIn,
        setUser: (newUser) => {
            dispatch(setUser(newUser));
        },
    };
}
