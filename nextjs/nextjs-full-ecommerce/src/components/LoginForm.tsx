"use client";

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import FormField from "./FormField";
import { doCredentialLogin } from "@/actions/client/auth";

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const fields = [
    {
        label: "Email",
        name: "email",
    },
    {
        label: "Password",
        name: "password",
    },
];

export default function LoginForm() {
    const router = useRouter();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: (values: { email: string; password: string }) =>
            doCredentialLogin({
                email: values.email,
                password: values.password,
            }),
        onSuccess: (user) => {
            if (user) {
                router.push("/");
            }
        },
        onError: (error) => {
            console.error("Login Error:", error);
        },
    });

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values) => mutate(values)}
        >
            <Form className="space-y-4">
                {fields.map((field, i) => (
                    <FormField key={"field" + field.name + i} label={field.label} name={field.name}>
                        <Field
                            type={field.name}
                            name={field.name}
                            className="input input-bordered w-full"
                        />
                    </FormField>
                ))}

                {isError && (
                    <div className="text-sm text-red-500">
                        {error instanceof Error ? error.message : "An error occurred during login"}
                    </div>
                )}

                <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
                    {isPending ? "Signing In..." : "Sign In"}
                </button>
            </Form>
        </Formik>
    );
}
