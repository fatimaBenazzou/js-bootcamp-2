import Link from "next/link";
import BooksList from "./components/BooksList";

export default function Home() {
    return (
        <main>
            <header>
                <h1>My Books</h1>
                <Link href="/add-book">Add Book</Link>
            </header>
            <BooksList />
        </main>
    );
}
