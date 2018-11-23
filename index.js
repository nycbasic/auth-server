const express = require("express"),
  http = require("http"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  cors = require("cors"),
  router = require("./routes");

const app = express();

// App setup
app.use(bodyParser.json({ type: "*/*" }));
app.use(morgan("combined"));
app.use(cors());
router(app);

// Server Setup
const port = process.env.PORT || 3030;
const server = http.createServer(app);

server.listen(port);
console.log("Server started on:", port);
