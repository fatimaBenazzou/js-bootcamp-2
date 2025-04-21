import { NavLink } from "react-router";
import useUser from "../hooks/useUser";

const Navbar = () => {
    const { user, setUser } = useUser();
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <header>
            <NavLink to="/shop/products" className="font-bold">
                Shop
            </NavLink>
            <NavLink to="/shop/cart" className="font-bold">
                Cart
            </NavLink>
            <NavLink to="/shop/orders" className="font-bold">
                Orders
            </NavLink>
            <nav className="flex justify-between bg-blue-600 text-white p-4">
                {user ? (
                    <>
                        <NavLink to="/shop/profile" className="mr-4">
                            Profile
                        </NavLink>
                        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
                            Logout
                        </button>
                    </>
                ) : (
                    <NavLink to="/auth/login">Login</NavLink>
                )}
            </nav>
            {/* <ToggleButton /> */}
        </header>
    );
};

export default Navbar;
