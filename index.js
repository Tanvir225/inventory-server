const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const moment = require('moment-timezone');
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


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        // Get the database and collection on which to run the operation
        const database = client.db("inventoryDB");
        const products = database.collection("products");
        const categories = database.collection("categories");
        const units = database.collection("units");


        // all get api-------------------------------------------------------------------------------------->

        // get api for products
        app.get("/api/v1/products", async (req, res) => {
            try {
                const result = (await products.find().sort({ _id: -1 }).toArray());
                res.status(200).send(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ error: error });
            }
        });

        // get api for categories
        app.get("/api/v1/categories", async (req, res) => {
            try {
                const result = await categories.find().toArray();
                res.status(200).send(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ error: error });
            }
        });

        // get api for units
        app.get("/api/v1/units", async (req, res) => {
            try {
                const result = await units.find().toArray();
                res.status(200).send(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ error: error });
            }
        });


        // end all get api -------------------------------------------------------------------------------------->


        // all post api-------------------------------------------------------------------------------------->

        // post api for products
        app.post("/api/v1/products", async (req, res) => {
            try {
                const { name, unit, stock, purchasePrice, sellPrice, category } = req.body;

                const newProduct = {
                    name,
                    unit,// ইউনিট আইডি
                    category,// ক্যাটেগরি আইডি
                    purchasePrice,
                    sellPrice,
                    stock,
                    createdAt: moment().tz('Asia/Dhaka').format('DD-MM-YYYY')
                };

                const result = await products.insertOne(newProduct);
                res.status(201).send(result);
                console.log(newProduct);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ error: error });
            }
        });


        //post api for units
        app.post("/api/v1/units", async (req, res) => {
            try {
                const unit = req.body;
                const result = await units.insertOne(unit);
                res.status(201).send(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ error: error });
            }
        });

        // post api for categories
        app.post("/api/v1/categories", async (req, res) => {
            try {
                const category = req.body;
                const result = await categories.insertOne(category);
                res.status(201).send(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ error: error });
            }
        });

        // end all post api -------------------------------------------------------------------------------------->

        // all patch api-------------------------------------------------------------------------------------->
        // patch api for products
        app.patch("/api/v1/products/:id", async (req, res) => {
            try {
                const id = req.params.id;
               
                const { name, unit, stock, purchasePrice, sellPrice, category } = req.body;
                const filter = { _id: new ObjectId(id) };
                const updateDoc = {
                    $set: {
                        name,
                        unit,// ইউনিট আইডি
                        category,// ক্যাটেগরি আইডি
                        purchasePrice,
                        sellPrice,
                        stock,
                        createdAt: moment().tz('Asia/Dhaka').format('DD-MM-YYYY')
                    },
                };
                const result = await products.updateOne(filter, updateDoc);
                res.status(200).send(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ error: error });
            }
        });
        // patch api for categories
        app.patch("/api/v1/categories/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const category = req.body;
                const filter = { _id: new ObjectId(id) };
                const updateDoc = {
                    $set: category,
                };
                const result = await categories.updateOne(filter, updateDoc);
                res.status(200).send(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ error: error });
            }
        });
        // patch api for units
        app.patch("/api/v1/units/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const unit = req.body;
                const filter = { _id: new ObjectId(id) };
                const updateDoc = {
                    $set: unit,
                };
                const result = await units.updateOne(filter, updateDoc);
                res.status(200).send(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ error: error });
            }
        });
        // end all patch api -------------------------------------------------------------------------------------->

        // all delete api-------------------------------------------------------------------------------------->
        // delete api for products
        app.delete("/api/v1/products/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const result = await products.deleteOne({ _id: new ObjectId(id) });
                res.status(200).send(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ error: error });
            }
        });
        // delete api for categories    
        app.delete("/api/v1/categories/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const result = await categories.deleteOne({ _id: new ObjectId(id) });
                res.status(200).send(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ error: error });
            }
        });
        // delete api for units
        app.delete("/api/v1/units/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const result = await units.deleteOne({ _id: new ObjectId(id) });
                res.status(200).send(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ error: error });
            }
        });
        // end all delete api -------------------------------------------------------------------------------------->


        // // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



//port
app.listen(port, () => console.log(`Server started on ${port}`));