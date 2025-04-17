import { Link, Outlet, useMatch } from "react-router";

const AuthLayout = () => {
    const isLogin = useMatch("/auth/login");

    return (
        <section>
            <h1>{isLogin ? "Login" : "Register"}</h1>
            <Outlet />
            <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Link to={isLogin ? "/auth/register" : "/auth/login"}>
                    {isLogin ? "Register here" : "Login here"}
                </Link>
            </p>
        </section>
    );
};
export default AuthLayout;
