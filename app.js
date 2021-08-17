const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const corsOptions = {
  origin: "*"
};

const app = express();
const port = process.env.PORT || 9010;

const db = require("./config/keys").mongoURI;
const authRoute = require("./src/routes/blogroute");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    retryWrites: true
  })
  .then(() => {
    console.log("MongoDB connected .....");
  })
  .catch(err => {
    console.log(err);
  });

app.get("/", (req, res) => res.send("Hello World!"));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use("/images", express.static("images"));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use("/api/v1/blog", authRoute);

app.listen(port, () => {
  console.log("server running a port at " + port);
});
