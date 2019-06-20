const express = require("express");
const app = express();
const PORT = 3000;
const layout = require("./views/layout");
const { db } = require("./models");
const wiki = require("./routes/wiki");
const user = require("./routes/user");

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

app.use("/wiki", wiki);

app.get("/", (req, res) => res.redirect("/wiki"));

const init = async () => {
  await db.sync({ force: true });
  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
};

init();
