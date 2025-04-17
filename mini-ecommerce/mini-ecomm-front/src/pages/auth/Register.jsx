import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

// Validation schema with Yup
const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
});

const Register = () => {
    return (
        <div>
            <h1>Register</h1>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema={registerSchema}
                onSubmit={() => {}}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <Field id="firstName" name="firstName" placeholder="First Name" />
                            {errors.firstName && touched.firstName && <div>{errors.firstName}</div>}
                        </div>

                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <Field id="lastName" name="lastName" placeholder="Last Name" />
                            {errors.lastName && touched.lastName && <div>{errors.lastName}</div>}
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <Field id="email" name="email" placeholder="Email" type="email" />
                            {errors.email && touched.email && <div>{errors.email}</div>}
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <Field
                                id="password"
                                name="password"
                                placeholder="Password"
                                type="password"
                            />
                            {errors.password && touched.password && <div>{errors.password}</div>}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                type="password"
                            />
                            {errors.confirmPassword && touched.confirmPassword && (
                                <div>{errors.confirmPassword}</div>
                            )}
                        </div>

                        <button type="submit">Register</button>

                        {/* <button type="submit" disabled={isPending} style={styles.button}>
                            {isPending ? "Loading..." : "Register"}
                        </button> */}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;
