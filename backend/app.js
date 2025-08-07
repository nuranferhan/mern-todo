const express = require("express");
const app = express();
const cors = require("cors");
require("./conn/conn");
const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("MERN Todo API is running!");
}); 

app.use("/api/v1", auth);
app.use("/api/v2", list);

// Vercel için port ayarı
const port = process.env.PORT || 1000;
app.listen(port, () => { 
  console.log(`Server Started on port ${port}`);
});

// Vercel için export
module.exports = app;