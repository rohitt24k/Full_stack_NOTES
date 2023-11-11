const todayTasksModel = require("../models/todayTasksModel");

const getTodayTasks = async (req, res) => {
  // const data = await todayTasksModel.find();
  // res.status(200).json(data);

  const data = await todayTasksModel.find({ "user.id": req.body.userID });
  // console.log(data[0]);

  res.json(data[0]);
};

const addTodayTasks = async (req, res) => {
  const data = req.body;

  const newData = await todayTasksModel.findOneAndUpdate(
    { "user.id": data.userID },
    { $push: { data: data.data } },
    { new: true }
  );
  console.log(newData);

  res.send("GOOD Saved");
};

const updateTask = async (req, res) => {
  const data = req.body;
  console.log(data);

  // const database = await todayTasksModel.findOneAndUpdate(
  //   {
  //     "user.id": req.body.userID,
  //   },
  //   {
  //     $set: { ["data${data.index}"]: data.data },
  //   }
  // );
  // console.log(database);

  // const data =
  // console.log(newData);

  res.send("GOOD Saved");
};

module.exports = { getTodayTasks, addTodayTasks, updateTask };
