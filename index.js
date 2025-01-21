const express = require("express");
const bodyParser = require("body-parser");
require("./config/databaseconnection");

const routes = require("./routes/index");

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

// Routes
app.use("/api", routes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ success: false, message: "Something broke!" });
});

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
