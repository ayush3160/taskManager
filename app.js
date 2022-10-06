const express = require("express");
require("./database/db");
const Task = require("./Schema/Task");
const path = require("path");

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.append(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token"
  );
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "./client/build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

app.post("/add-task", async (req, res) => {
  try {
    const task = new Task(req.body);

    const result = await task.save();

    res.status(201).json({ msg: "Task Added" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ start: -1 });

    const allTasks = tasks.map((value) => {
      const startDate = value.start.toString();

      const endDate = value.end.toString();

      return {
        id: value._id,
        title: value.title,
        description: value.description,
        start: startDate,
        end: endDate,
        status: value.status,
        priority: value.priority,
      };
    });

    console.log(allTasks);

    res.status(200).json(allTasks);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

app.delete("/deleteTask/:id", async (req, res) => {
  try {
    const result = await Task.deleteOne({ id: req.params.id });

    res.json({ msg: "Task Deleted" }).status(200);
  } catch (error) {
    console.log(error);
  }
});

app.patch("/updateTask/:id", async (req, res) => {
  try {
    console.log(req.params.id);

    const result = await Task.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          start: req.body.start,
          end: req.body.end,
          status: req.body.status,
          priority: req.body.priority,
        },
      }
    );

    res.status(200).json({ msg: "Updated" });
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

app.listen(port, () => {
  console.log("server is listening on port 5000");
});
