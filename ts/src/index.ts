enum Status {
    Pending = "pending",
    Published = "published",
}
type Product = {
    name: string;
    price: number;
    images: string[];
    status: Status;
};

const product: Product = {
    name: "Shampoo",
    price: 2.99,
    images: ["image-1.png", "image-2.png"],
    status: Status.Published,
};
