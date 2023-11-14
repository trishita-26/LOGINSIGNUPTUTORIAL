const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const Collection = require("./mongodb");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const tempelatePath = path.join(__dirname, "../tempelates");
const publicPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.set("views", tempelatePath);

app.use(express.urlencoded({ extended: false }));

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };

  try {
    const checking = await LogInCollection.findOne({ name: req.body.name });

    if (checking) {
      res.send("User details already exist");
    } else {
      await LogInCollection.create(data);
      res.status(201).render("home", { naming: req.body.name });
    }
  } catch (error) {
    console.error(error);
    res.send("Error processing signup");
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await LogInCollection.findOne({ name: req.body.name });

    if (check && check.password === req.body.password) {
      res.status(201).render("home", { naming: req.body.name });
    } else {
      res.send("Incorrect password or user does not exist");
    }
  } catch (error) {
    console.error(error);
    res.send("Error processing login");
  }
});

mongoose.connect("mongodb://localhost:27017/LogInCollection", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
await Collection.insertMany([data]);

es.render("home");

app.listen(3000, () => {
  console.log("port connected");
});
