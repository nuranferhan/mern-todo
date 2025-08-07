const express = require("express");
const app = express();
const cors = require("cors");
require("./conn/conn");
const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(express.json());
app.use(cors());

// Health check endpoint
app.get("/", (req, res) => {
    res.send("MERN-TODO Backend is running!");
}); 

// API routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// Export for Vercel
module.exports = app;

// Local development server
if (require.main === module) {
  const PORT = process.env.PORT || 1000;
  app.listen(PORT, () => { 
    console.log(`Server Started on port ${PORT}`);
  });
}