const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");

//dotenv
require("dotenv").config();


//middleware
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());




app.get("/", (req, res) => {
    res.send("Welcome to the Inventory Management System");
});


//port
app.listen(port, () => console.log(`Server started on ${port}`));