import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email Required."),
    password: Yup.string()
        .min(6, "Your password must be at least 6")
        .required("Password Required."),
});
export default function Login() {
    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={() => {}}
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
