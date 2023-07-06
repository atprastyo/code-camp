// index.js
// where your node app starts

// init project
var express = require("express");
var multer  = require('multer');
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

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/:date?", function (req, res) {
  const { date } = req.params;

  console.log(date);

  let response;

  if (!date) {
    response = new Date();
  } else {
    let intDate = parseInt(date);
    if (/\d{5,}/.test(intDate)) {
      response = new Date(intDate);
    } else {
      response = new Date(date);
    }
    console.log(response);
  }
  if (response.toString().includes("Invalid")) {
    return res.json({
      error: "Invalid Date",
    });
  } else {
    return res.json({
      unix: response.getTime(),
      utc: response.toUTCString(),
    });
  }
});

app.get("/api/whoami", (req, resp) => {
  const { headers } = req;

  resp.json({
    ipaddress: req.ip,
    language: headers["accept-language"] || headers["content-language"],
    software: headers["user-agent"],
  });
});

app.post("/api/fileanalyse",
  //'upfile' from the form input in index.html
  multer({ dest: 'uploadedFiles/' }).single('upfile'),
  (req, res) => {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
