"use client";
import { addBook } from "@/actions/client/book";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

const initailBook: BaseBookI = {
    title: "",
    author: "",
    genre: "",
    description: "",
    publishedDate: new Date(),
};

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title required"),
    author: Yup.string().required("author required"),
    genre: Yup.string().required("genre required"),
    description: Yup.string().required("description required"),
    publishedDate: Yup.date(),
});

export default function BookForm() {
    const { mutate, isPending } = useMutation({
        mutationKey: ["AddBook"],
        mutationFn: addBook,
        onSuccess(data) {
            toast.success(`${data} Book added successfully !`);
        },
        onError(error) {
            toast.error(error.message);
        },
    });

    return (
        <Formik
            initialValues={initailBook}
            validationSchema={validationSchema}
            onSubmit={(values) => mutate(values)}
        >
            <Form>
                <fieldset>
                    <legend>Title</legend>
                    <Field name="title" placeholder="Book Title" />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Author</legend>
                    <Field className="input" name="author" placeholder="Author" />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Genre</legend>
                    <Field className="input" name="genre" placeholder="Genre" />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Description</legend>
                    <Field
                        className="textarea"
                        name="description"
                        as="textarea"
                        placeholder="Description"
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Publication Date</legend>
                    <Field className="input" name="publishedDate" type="date" />
                </fieldset>

                <button type="submit" disabled={isPending}>
                    {isPending ? "Loading..." : "Add Book"}
                </button>
            </Form>
        </Formik>
    );
}
