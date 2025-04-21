import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, removeFromCart } from "../app/slices/cartSlice";

export default function useCart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const cartItems = cart.items || [];
    const subTotal = cartItems.reduce(
        (total, item) => total + item.product.price.current * item.quantity,
        0
    );
    return {
        cart: cartItems,
        total: subTotal,
        addToCart: (product, quantity = 1) => dispatch(addToCart({ product, quantity })),
        removeFromCart: (productId, quantity = 1) =>
            dispatch(removeFromCart({ productId, quantity })),
        clearCart: () => dispatch(clearCart()),
    };
}
