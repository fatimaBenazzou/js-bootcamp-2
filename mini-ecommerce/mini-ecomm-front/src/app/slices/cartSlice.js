import { createSlice } from "@reduxjs/toolkit";
const loadCartFromLocalStorage = () => {
    try {
        if (typeof window !== "undefined") {
            const cart = localStorage.getItem("cart");
            return cart ? JSON.parse(cart) || { items: [], total: 0 } : { items: [], total: 0 };
        }
        return { items: [], total: 0 };
    } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
        return { items: [], total: 0 };
    }
};

const saveCartToLocalStorage = (cart) => {
    if (cart.items.length) {
        localStorage.setItem("cart", JSON.stringify(cart));
    } else {
        localStorage.removeItem("cart");
    }
};

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { product, quantity = 1 } = action.payload;
            const existingProductIndex = state.items.findIndex(
                (item) => item.product._id === product._id
            );

            if (existingProductIndex !== -1) {
                state.items[existingProductIndex].quantity += quantity;
            } else {
                state.items.push({ product, quantity });
            }

            // Mettre à jour le total
            state.total = state.items.reduce((total, item) => total + item.quantity, 0);
            saveCartToLocalStorage(state);
        },
        removeFromCart: (state, action) => {
            const { productId, quantity = 1 } = action.payload;
            state.items = state.items
                .map((item) => {
                    if (item.product._id === productId) {
                        return { ...item, quantity: item.quantity - quantity };
                    }
                    return item;
                })
                .filter((item) => item.quantity > 0);

            // Mettre à jour le total
            state.total = state.items.reduce((total, item) => total + item.quantity, 0);

            saveCartToLocalStorage(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
            saveCartToLocalStorage(state);
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
