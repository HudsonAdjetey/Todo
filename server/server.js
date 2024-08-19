require("dotenv").config();
const path = require("path");
const express = require("express");
const pool = require("./db.config");
const app = express();
const PORT = process.env.PORT || 5294;
const cors = require("cors");
const { v4: uuid } = require("uuid");

app.use(express());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/todos/:userEmail", async (req, res, next) => {
  try {
    const response = await pool.query(
      `SELECT * FROM todos WHERE user_email = $1`,
      [req.params.userEmail]
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// create a new todo
app.post("/todos", async (req, res, next) => {
  try {
    const { title, progress, user_email, date } = req.body;
    const id = uuid();
    const response = await pool.query(
      `INSERT INTO todos (id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id, user_email, title, progress, date]
    );
    res.status(201).json(response.rows[0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// all
app.use("*", (_, res, next) => {
  const format = _.accepts(["json", "html", "text"]);
  if (format === "json") {
    res.status(404).json({ message: "Hello, World!" });
  }
  res.sendFile(path.join(__dirname, "views", "404.html"));
  next();
});

// call the error
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Port running on ${PORT}`);
});
