import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { tasks: tasks });
});

const tasks = [];

app.post("/add", (req, res) => {
  const task = req.body.task;
  if (task) {
    tasks.push({ description: task, completed: false });
  }
  res.redirect("/");
});

app.post("/complete", (req, res) => {
  const index = Number(req.body.index);
  tasks[index].completed = !tasks[index].completed;
  res.redirect("/");
});

app.post('/clear', (req, res) => {
    tasks.length = 0;
    res.redirect('/');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
