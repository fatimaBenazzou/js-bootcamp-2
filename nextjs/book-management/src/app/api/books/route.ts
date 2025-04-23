import dbConnect from "@/lib/dbConnection";
import bookModel from "@/models/book";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    const books = await bookModel.find().sort({ publishedDate: -1 });
    return NextResponse.json(books);
}
export async function POST(req: NextRequest) {
    await dbConnect();
    const { title, author, publishedDate, genre, description }: BaseBookI = await req.json();
    const newBook = await bookModel.create({ title, author, publishedDate, genre, description });
    return NextResponse.json({ message: `Book ${newBook.title} created successfully! ` });
}
export async function DELETE(req: NextRequest) {
    await dbConnect();
    const { id } = await req.json();
    await bookModel.findByIdAndDelete(id);
    return NextResponse.json({ message: `Book deleted successfully! ` });
}
