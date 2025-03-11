import express from "express";

const app = express();

const PORT = 3500;

app.use(express.urlencoded({ extended: true }));

const user = {
    firstName: "Fatima",
    lastName: "BENAZZOU",
    note: 15,
};

app.get("/", (req, res) => {
    res.send(`<h1>Hello from the backend</h1>
        <form method="POST" action="/note">
         <input type="number" name="exam-note" max="20" min="0" />
            <button type="submit">
                Submit
            </button>
        </form>
        `);
});

app.post("/note", (req, res) => {
    user.note = Number(req.body["exam-note"]);
    res.send("<a href='/about' >Take me to about me</a>");
});

app.get("/users/:id", (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});

app.get("/about", (req, res) => {
    res.send(`
        <div>
         <h2>${user.firstName} ${user.lastName}</h2>
         <p>My note is : ${user.note}</p>
        </div>
        `);
});

app.listen(PORT, () => {
    console.log(`Server is runing on port: http://localhost:${PORT}`);
});
