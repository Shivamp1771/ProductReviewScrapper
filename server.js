const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router");
const createErrors = require("http-errors");

const app = express();

const PORT = 3000;

app.locals.appName = "WeView";

app.use(express.static("public"));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "./static")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", router);

app.use((req, res, next) => next(createErrors(404, "File not found")));

app.use((e, req, res, next) => {
  console.log(e);
  res.locals.message = e.message;
  res.locals.status = e.status || 500;
  res.status(res.locals.status);
  res.render("layout/index", {
    pageTitle: res.locals.message,
    template: "error",
  });
});

app.listen(PORT, () => {
  console.log(`Weview app is working on port ${PORT}`);
});
