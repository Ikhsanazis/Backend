const express = require("express");
const app = express();
const port = process.env.PORT || 8001;

const bodyParser = require("body-parser");
const helmet = require("helmet");
const dotenv = require("dotenv");
dotenv.config();

const usersRoutes = require("./Route/users");
const recipesRoutes = require("./Route/recipes");
const commentsRoutes = require("./Route/comments");
const authRoutes = require("./Route/auth");

app.use(helmet());
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
const allowlist = [
  "https://localhost:3000",
  "http://localhost:3000/Registerlagi",
];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// ALL ROUTES
app.use("/", cors(corsOptionsDelegate), usersRoutes);
app.use("/", cors(corsOptionsDelegate), recipesRoutes);
app.use("/", cors(corsOptionsDelegate), commentsRoutes);
app.use("/", cors(corsOptionsDelegate), authRoutes);

app.use("*", (req, res) => {
  res.send("Sukses");
});
// END OF BOTTOM CODE
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
