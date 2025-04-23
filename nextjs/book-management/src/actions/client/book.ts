import axiosConfig from "./axiosConfig";

export async function getBooks(): Promise<BookI[]> {
    const response = await axiosConfig.get("/books");
    return response.data;
}
export async function addBook(book: BaseBookI) {
    const response = await axiosConfig.post("/books", book);
    return response.data;
}
export async function deleteBook(id: string): Promise<BookI[]> {
    const response = await axiosConfig.delete("/books", { data: { id } });
    return response.data;
}
