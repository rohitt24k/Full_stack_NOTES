const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  user: {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  data: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      list: {
        type: String,
        trim: true,
      },
      duedate: {
        type: String,
      },
      tags: [
        {
          type: String,
        },
      ],
      subtasks: [
        {
          name: {
            type: String,
            trim: true,
          },
          isdone: {
            type: Boolean,
          },
        },
      ],
      isdone: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const todayTasksModel = mongoose.model("todayTask", tasksSchema);

module.exports = todayTasksModel;
