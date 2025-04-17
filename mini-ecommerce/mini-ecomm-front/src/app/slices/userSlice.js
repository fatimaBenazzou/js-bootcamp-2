import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isAdmin: false,
        isLoggedIn: false,
    },
    reducers: {
        setUser: (state, action) => {
            const newUser = action.payload;
            if (newUser) {
                (state.user = newUser),
                    (state.isAdmin = newUser.role === "admin"),
                    (state.isLoggedIn = true);
            } else {
                (state.user = null), (state.isAdmin = false), (state.isLoggedIn = false);
            }
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
