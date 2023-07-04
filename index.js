// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", function (req, res) {
  const { date } = req.params;

  let response;

  if (!date) {
    response = new Date();
  } else {
    if (date.includes("-")) {
      response = new Date(date);
    } else {
      let unix = parseInt(date);
      response = new Date(unix);
    }
    console.log(response);
  }
  if (response.toString().includes("Invalid")) {
    return res.json({
      error: response.toUTCString(),
    });
  } else {
    return res.json({
      unix: response.getTime(),
      utc: response.toUTCString(),
    });
  }
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || "5555", function () {
  console.log("Your app is listening on port " + listener.address().port);
});
