const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});


const port = process.env.PORT || 9010;

const db = require("./config/keys").mongoURI;
const blogRoute = require("./src/routes/blogroute");
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
app.use("/api/v1/blog", blogRoute);

app.listen(port, () => {
  console.log("server running a port at " + port);
});
