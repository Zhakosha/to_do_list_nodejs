const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));

mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");

    app.listen(8000, ()=> console.log("Server is OK"));
});

app.set("view engine", "ejs");

app.get('/',(req, res) => {
    res.render('todolist.ejs');
});

app.post('/',(req, res) => {
    console.log(req.body);
});

// app.listen(8000, ()=> console.log("Server is OK"));