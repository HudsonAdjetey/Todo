require("dotenv").config();
const path = require("path");
const express = require("express");
const pool = require("./db.config");
const app = express();
const PORT = process.env.PORT || 5294;
const cors = require("cors");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
app.use(express());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/todos/:userEmail", async (req, res, next) => {
  try {
    const response = await pool.query(
      `SELECT * FROM todos WHERE user_email = $1 ORDER BY created_at`,
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
    return res.status(201).json(response.rows[0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// edit todo
app.put("/todos/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, progress, user_email, date } = req.body;
    const response = await pool.query(
      `UPDATE todos SET title=$1, progress=$2, user_email=$3, date=$4 WHERE id=$5 RETURNING *`,
      [title, progress, user_email, date, id]
    );
    return res.status(200).json(response.rows[0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// delete todo

app.delete("/todos/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await pool.query(`DELETE FROM todos WHERE id=$1`, [id]);
    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// signup

app.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // generate salt
    const genSalt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, genSalt);
    const id = uuid();
    const response = await pool.query(
      `INSERT INTO users (id, email, hashed_password) VALUES ($1, $2, $3) RETURNING *`,
      [id, email, hashed_password]
    );
    return res.status(201).json(response.rows[0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// login

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);
    if (response.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const validPassword = await bcrypt.compare(
      password,
      response.rows[0].password
    );
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: response.rows[0].id },
      process.env.JWT_SECRET
    );
    return res.json({ token });
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
