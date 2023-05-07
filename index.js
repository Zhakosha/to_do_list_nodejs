const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const error = require("mongoose/lib/error");

const TodoTask = require("./models/TodoTask");

dotenv.config();



app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));

const db = 'mongodb+srv://TodoList:Rfrltkf7@cluster0.doy6gwm.mongodb.net/ToDoList?retryWrites=true&w=majority'

mongoose
    .connect(db)
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("todolist.ejs");
    
});

app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});



app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
  });
        

app.listen(8000, ()=> console.log("Server is OK"));