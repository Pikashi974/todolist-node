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
app.post("/connect", async (req, res) => {
  // console.log(req.body);
  var formdata = new FormData();
  formdata.append("identifier", req.body.identifier);
  formdata.append("password", req.body.password);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  let response = await fetch(
    process.env.LINK_API + "/api/auth/local",
    requestOptions
  )
    .then((res) => res.json())
    .catch((error) => console.log("error", error));
  console.log(response);
  res.send(response);
});
app.post("/subscribe", async (req, res) => {
  console.log(req.body);
  if (req.body.password == req.body.password2) {
    let response = await fetch(
      process.env.LINK_API + "/api/auth/local/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        }),
      }
    ).then((res) => res.json());
    // console.log(response);
    // localStorage.setItem("user", response);

    res.send(response);
  }

  res.sendStatus(400);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
