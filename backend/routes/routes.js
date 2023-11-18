const express = require("express");

const { singUp, singIn } = require("../controller/loginControllers");
const {
  getTodayTasks,
  addTodayTasks,
  updateTask,
  deleteTask,
} = require("../controller/todayTasksControllers");

const router = express.Router();
router.get("/", (req, res) => {
  res.send("API logged");
});
router.post("/signup", singUp);
router.post("/signin", singIn);
router.post("/getTodayTasks", getTodayTasks);
router.post("/addtodayTasks", addTodayTasks);
router.post("/updateTodayTasks", updateTask);
router.post("/deleteTodayTasks", deleteTask);

module.exports = router;
