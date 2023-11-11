const authModel = require("../models/authenticationModel");
const todayTasksModel = require("../models/todayTasksModel");

const singUp = async (req, res) => {
  console.log(req.body);
  const checker = await authModel.find({ email: req.body.email });
  if (!checker.length) {
    const auth = new authModel({
      name: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      email: req.body.email,
      password: req.body.password,
    });

    const todayTaskInitialize = new todayTasksModel({
      user: {
        id: auth._id,
        email: auth.email,
      },
    });

    auth.save();
    todayTaskInitialize.save();
    res.status(200).json({ status: "OK", userData: auth });
  } else {
    res
      .status(409)
      .json({ status: "ERROR", error: "This email ID already exists" });
  }
};

const singIn = async (req, res) => {
  console.log(req.body);
  const checker = await authModel.find({ email: req.body.email });
  if (!checker.length) {
    res
      .status(401)
      .json({ status: "ERROR", error: "The Email ID in not valid" });
  } else {
    const data = await authModel.find({
      email: req.body.email,
      password: req.body.password,
    });
    if (data.length) {
      res.status(200).json({ status: "OK", data: data[0] });
    } else {
      res.status(401).json({
        status: "ERROR",
        error: "The password you entered in incorrect",
      });
    }
  }
};

module.exports = { singUp, singIn };
