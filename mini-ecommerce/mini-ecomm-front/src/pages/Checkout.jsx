import { useState } from "react";
import { useNavigate } from "react-router";
import useCart from "../hooks/useCart";
import useUser from "../hooks/useUser";
import { provincesPrices } from "../api/provinces-prices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createOrder } from "../api/endpoints/orders";

// Validation schema with Yup
const checkoutSchema = Yup.object().shape({
    province: Yup.number().required("Province is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string(),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
});

function Checkout() {
    const { cart, total: subtotal, clearCart } = useCart();
    const { user } = useUser();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isPending, mutate: CreateOrderAction } = useMutation({
        mutationFn: createOrder,
        mutationKey: ["create-order"],
        onSuccess() {
            queryClient.invalidateQueries(["orders"]);
            clearCart();
            alert("Commande confirmée 🎉");
            navigate("/shop/products");
        },
        onError(error) {
            console.error("Erreur lors de la commande :", error);
            // toast.error("Une erreur s'est produite lors de la commande. Veuillez réessayer.");
        },
    });

    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const totalPrice = subtotal + deliveryPrice;

    const handleProvinceChange = (provinceId, setFieldValue) => {
        const selectedProvince = provincesPrices.find((province) => province.id === provinceId);
        if (selectedProvince?.price) {
            setDeliveryPrice(selectedProvince.price);
        }
        setFieldValue("province", provinceId);
    };

    const handleSubmit = (values) => {
        const orderData = {
            userId: user._id,
            cart: cart.map((item) => ({
                productId: item.product._id,
                quantity: item.quantity,
            })),
            delivery: values,
            total: totalPrice,
        };

        CreateOrderAction(orderData);
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
            <h2>Checkout</h2>

            <div style={{ marginBottom: "20px" }}>
                <p>
                    <strong>Sub-total :</strong> {subtotal} DA
                </p>
                <p>
                    <strong>Delivery :</strong> {deliveryPrice} DA
                </p>
                <p>
                    <strong>Total :</strong> {totalPrice} DA
                </p>
            </div>

            <Formik
                initialValues={{
                    province: "",
                    city: "",
                    address: "",
                    phone: "",
                }}
                validationSchema={checkoutSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div style={{ marginBottom: "15px" }}>
                            <label
                                htmlFor="province"
                                style={{ display: "block", marginBottom: "5px" }}
                            >
                                Province:
                            </label>
                            <Field
                                as="select"
                                name="province"
                                onChange={(e) =>
                                    handleProvinceChange(parseInt(e.target.value), setFieldValue)
                                }
                                style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                            >
                                <option value="">Select a province</option>
                                {provincesPrices.map((province) => (
                                    <option key={province.id} value={province.id}>
                                        {province.name.en} ({province.price} DA)
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage
                                name="province"
                                component="div"
                                style={{ color: "red", fontSize: "14px" }}
                            />
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <label htmlFor="city" style={{ display: "block", marginBottom: "5px" }}>
                                City:
                            </label>
                            <Field
                                type="text"
                                name="city"
                                style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                            />
                            <ErrorMessage
                                name="city"
                                component="div"
                                style={{ color: "red", fontSize: "14px" }}
                            />
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <label
                                htmlFor="address"
                                style={{ display: "block", marginBottom: "5px" }}
                            >
                                Address:
                            </label>
                            <Field
                                type="text"
                                name="address"
                                style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                            />
                            <ErrorMessage
                                name="address"
                                component="div"
                                style={{ color: "red", fontSize: "14px" }}
                            />
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <label
                                htmlFor="phone"
                                style={{ display: "block", marginBottom: "5px" }}
                            >
                                Phone number:
                            </label>
                            <Field
                                type="text"
                                name="phone"
                                style={{ width: "100%", padding: "10px", fontSize: "16px" }}
                            />
                            <ErrorMessage
                                name="phone"
                                component="div"
                                style={{ color: "red", fontSize: "14px" }}
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                padding: "10px 20px",
                                background: "green",
                                color: "white",
                                cursor: "pointer",
                                width: "100%",
                                fontSize: "16px",
                            }}
                            disabled={isPending}
                        >
                            {isPending ? "Confirming..." : "Confirm Order"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Checkout;
