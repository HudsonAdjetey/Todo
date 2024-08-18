require("dotenv").config();
const path = require("path");
const express = require("express");
const pool = require("./db.config");
const app = express();
const PORT = process.env.PORT || 5614;

app.use(express());

app.use(express.static(path.join(__dirname, "public")));

app.get("/todos", async (req, res) => {
  try {
    const response = await pool.query(
      `SELECT EXTRACT(YEAR FROM date) AS year FROM todos;`
    );
    res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
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
