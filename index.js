const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
const path = require("path");
const port = 3000;

require("dotenv").config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use("/src/img", express.static(path.join(__dirname, "src/img")));
app.use("/src/js", express.static(path.join(__dirname, "src/js")));
app.use("/src/css", express.static(path.join(__dirname, "src/css")));
app.get("/favicon.ico", (req, res) => {
  res.sendFile(__dirname + "/src/img/favicons/favicon.ico");
});
app.get("/navbar", async (req, res) => {
  res.json(
    await fetch(
      process.env.LINK_API +
        "/api/main-menu?populate[0]=MainMenuItems&populate[1]=MainMenuItems.menu&populate[2]=MainMenuItems.links"
    ).then((res) => res.json())
  );
});
app.post("/connect", (req, res) => {
  //   console.log(req.body);

  res.send("Connect");
});
app.post("/subscribe", (req, res) => {
  //   console.log(req.body);
  res.send("Subscribe");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
