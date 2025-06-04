const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Routes = require("./routes/index");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/", Routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
