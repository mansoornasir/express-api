const express = require("express");
const app = express();
const PORT = 3001 || process.env.PORT;
const articleRoute = require("./routes/article");
const userRoute = require("./routes/user");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/article", articleRoute);
app.use("/user", userRoute);

mongoose.connect(process.env.DB_CONNECT, () => console.log("Connected to DB!"));

app.listen(PORT, () => console.log("Api running on port: " + PORT));
