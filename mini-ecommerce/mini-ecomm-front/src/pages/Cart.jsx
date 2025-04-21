import { useNavigate } from "react-router";
import useCart from "../hooks/useCart";

function Cart() {
    const { cart, removeFromCart, total, clearCart } = useCart();
    const navigate = useNavigate();

    return (
        <div style={{ maxWidth: "600px", margin: "auto" }}>
            <h2>Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cart.map((item) => (
                        <li
                            key={item.product._id}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "10px",
                            }}
                        >
                            <span>
                                {item.product.name} - {item.product.price.current}€ (x
                                {item.quantity})
                            </span>
                            <button
                                onClick={() => {
                                    removeFromCart(item.product._id);
                                    alert("Item removed to cart successfully");
                                }}
                            >
                                ❌
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {cart.length > 0 && (
                <div>
                    <p>
                        <strong>Total : {total}€</strong>
                    </p>
                    <button
                        onClick={() => navigate("/shop/checkout")}
                        style={{
                            padding: "10px 20px",
                            background: "blue",
                            color: "white",
                            cursor: "pointer",
                            marginRight: "10px",
                        }}
                    >
                        Make order
                    </button>
                    <button
                        onClick={() => {
                            clearCart();
                            alert("Cart cleared successfully");
                        }}
                        style={{
                            padding: "10px 20px",
                            background: "red",
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        Reset Cart
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;
