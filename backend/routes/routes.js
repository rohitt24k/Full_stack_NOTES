const express = require("express");

const { singUp, singIn } = require("../controller/loginControllers");
const {
  getTodayTasks,
  addTodayTasks,
  updateTask,
} = require("../controller/todayTasksControllers");

const router = express.Router();
router.get("/", (req, res) => {
  res.send("API logged");
});
router.post("/signup", singUp);
router.post("/signin", singIn);
router.post("/getTodayTasks", getTodayTasks);
router.post("/addtodayTasks", addTodayTasks);
router.patch("/addtodayTasks", updateTask);

module.exports = router;
