import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ShopLayout from "./layouts/ShopLayout";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/profile";
import Checkout from "./pages/Checkout";
import NotFoundPage from "./pages/NotFoundPage";
import useUser from "./hooks/useUser";

export default function AppRoutes() {
    const { user } = useUser();
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                {/* auth routes */}
                <Route
                    path="/auth"
                    element={user ? <Navigate to="/shop/products" /> : <AuthLayout />}
                >
                    <Route index element={<Navigate to={"/auth/login"} />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

                {/* Shop routes */}
                <Route
                    path="/shop"
                    element={user ? <ShopLayout /> : <Navigate to={"/auth/login"} />}
                >
                    <Route index element={<Navigate to="/shop/products" />} />
                    <Route path="products" element={<Products />} />
                    <Route path="products/:productId" element={<ProductDetails />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="profile" element={<Profile />} />
                </Route>

                {/* not found */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
