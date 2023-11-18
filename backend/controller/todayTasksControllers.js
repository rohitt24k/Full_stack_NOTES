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

  res.send(newData);
};

const updateTask = async (req, res) => {
  const data = req.body;
  const userID = data.userID;
  console.log(data);
  const database = await todayTasksModel.findOneAndUpdate(
    { "user.id": userID },
    { $set: { "data.$[elem]": data.data } },
    { arrayFilters: [{ "elem._id": data.data._id }] }
  );

  res.send("The data is updated");
};

const deleteTask = async (req, res) => {
  const data = req.body;
  const userID = data.userID;
  console.log(data);
  const database = await todayTasksModel.findOneAndUpdate(
    { "user.id": userID },
    { $pull: { data: { _id: data.data._id } } }
  );

  res.send("The data is deleted");
};

module.exports = { getTodayTasks, addTodayTasks, updateTask, deleteTask };
