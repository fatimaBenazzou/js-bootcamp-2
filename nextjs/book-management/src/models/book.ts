import { Model, model, models, Schema, Types } from "mongoose";

const bookSchema = new Schema<BookI<Types.ObjectId>>(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        publishedDate: { type: Date, required: true },
        genre: { type: String, required: true },
        description: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const bookModel = models["Book"] || (model("Book", bookSchema) as Model<BookI<Types.ObjectId>>);
export default bookModel;
