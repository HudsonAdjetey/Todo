require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5614;

app.use(express());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (res, req) => {
  //   res.sendFile(path.join(__dirname, "index.html"));
  res.setHeader({
    "Content-Type": "application/json",
  });
  res.status(200).json({
    message: "Hello, World!",
  });
});

app.get('/todos', async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
})
// all
app.use("*", (_, res, next) => {
  const format = _.accepts(["json", "html", "text"]);
  if (format === "json") {
    res.set("Content-Type", "application/json");
    res.json({ message: "Hello, World!" });
  }
  res.sendFile(path.join(__dirname, "public", "index.html"));
  next();
});

// call the error
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Port running on ${PORT}`);
});
