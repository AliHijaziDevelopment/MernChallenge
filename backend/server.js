const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();
const app = express();
//get them from .env file
const port = process.env.PORT;
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());

//connect to the db
mongoose.connect(uri, {});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//routes for api (create ,edit, delete,get)
const itemsRouter = require("./routes/items");
const categoryRouter = require("./routes/category");
app.use("/items", itemsRouter);
app.use("/category", categoryRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
