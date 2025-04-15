import productModel from "../models/product.js";

export async function getProducts(req, res) {
    try {
        const products = await productModel.find().sort({ createdAt: 1 });
        res.json({ data: products });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export async function getProduct(req, res) {
    try {
        const productId = req.params.productId;
        const product = await productModel.findOne({ _id: productId });

        if (!product) throw new Error("Product not found");

        res.json({ data: product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function createProduct(req, res) {
    try {
        const product = await productModel.create(req.body);
        res.json({ data: product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function updatetProduct(req, res) {
    try {
        const productId = req.params.productId;
        const updateProduct = await productModel.findOneAndUpdate(
            { _id: productId },
            { $set: req.body },
            { new: true }
        );

        res.json({ message: "Product updated successfully", data: updateProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function deleteProduct(req, res) {
    try {
        const productId = req.params.productId;
        const deleteStatus = await productModel.deleteOne({ _id: productId });
        if (deleteStatus.deletedCount !== 1) throw new Error("Product couldn't be deleted");

        res.json({ message: `Product ${productId} has been deleted successfully` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
