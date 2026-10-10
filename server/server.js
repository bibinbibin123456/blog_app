
require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const apiRouter = require("./router");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRouter);

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();