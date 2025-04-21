import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { login as loginApi } from "../../api/endpoints/auth";
import useUser from "../../hooks/useUser";

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email Required."),
    password: Yup.string()
        .min(6, "Your password must be at least 6")
        .required("Password Required."),
});
export default function Login() {
    const { setUser } = useUser();
    // const [form, setForm] = useState({ email: "", password: "" });
    const { mutate: loginAction } = useMutation({
        mutationFn: loginApi,
        onSuccess: (response) => {
            const { token, user } = response.data;
            localStorage.setItem("token", token);
            setUser(user);
            alert(`Welcome ${user.firstName}!`);
        },
        onError: (error) => {
            console.log(error.response.data.error);
            alert("Login Failed !");
        },
    });

    // const handleChange = (e) => {
    //     setForm({ ...form, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     await loginAction();
    // };
    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
                loginAction(values);
            }}
        >
            <Form>
                <div>
                    <label htmlFor="email">Email</label>
                    <Field id="email" name="email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter a password"
                    />
                </div>

                <button type="submit">Se connecter</button>
            </Form>
        </Formik>
    );
}
