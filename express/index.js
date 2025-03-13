import express from "express";
import morgan from "morgan";

const app = express();

const PORT = 3500;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/public", express.static("./public"));
// const config = { root: "./views" };
const user = {
    firstName: "Fatima",
    lastName: "BENAZZOU",
    note: 15,
    skills: [
        { name: "JavaScript", level: "Advanced" },
        { name: "React", level: "Advanced" },
        { name: "Redux Toolkit", level: "Intermediate" },
        { name: "React Native", level: "Intermediate" },
        { name: "Node.js", level: "Advanced" },
        { name: "TypeScript", level: "Intermediate" },
        { name: "Angular", level: "Intermediate" },
        { name: "HTML & CSS", level: "Advanced" },
        { name: "Tailwind CSS", level: "Intermediate" },
        { name: "MongoDB", level: "Intermediate" },
        { name: "Git", level: "Advanced" },
        { name: "Docker", level: "Basic" },
        { name: "Figma", level: "Basic" },
    ],
};
const filError = (res) => (err, html) => {
    if (err) return res.status(404).send("File not found");
    else res.send(html);
};

app.get("/", (req, res) => {
    res.render("home", filError(res));
});

app.post("/note", (req, res) => {
    user.note = Number(req.body["exam-note"]);
    res.render("received-note", filError(res));
});

app.get("/about", (req, res) => {
    res.locals = { user };
    res.render("about", filError(res));
});

app.listen(PORT, () => {
    console.log(`Server is runing on port: http://localhost:${PORT}`);
});
