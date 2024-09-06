import taskSchema from "../models/taskSchema.js";
import userSchema from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      res.status(202).send({ message: "email" });
    } else {
      const isValid = await bcrypt.compare(password, user.password);
      console.log(isValid);
      if (isValid) {
        req.session.adminID = user._id.toString();

        res.status(202).send({ adminID: user._id.toString() });
      } else {
        res.status(202).send({ message: "password" });
      }
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const signUp = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await userSchema.create({
      username: username,
      email: email,
      password: await bcrypt.hash(req.body.password, 10),
    });
    user.save();
    if (!user) {
      res.status(404).json({ message: "error" });
    } else {
      res.status(202).send({ message: "done" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const addTask = async (req, res) => {
  const { topic, name, email, address, country, adminID } = req.body;

  try {
    // Check if the email already exists in any task
    const existingTask = await taskSchema.findOne({ email });

    if (existingTask) {
      // Email already exists, send a response indicating the issue
      res.status(409).json({ message: "Email already exists" });
    } else {
      // Proceed with creating the new task
      const newTask = await taskSchema.create({
        topic,
        name,
        email,
        address,
        country,
        adminID,
      });

      newTask.save();
      if (!newTask) {
        res.status(404).json({ message: "Error creating task" });
      } else {
        res.status(201).json(newTask);
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTodo = async (req, res) => {
  try {
    const page = req.body.page || 1; // Default to page 1
    const limit = req.body.limit || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;

    const tasks = await taskSchema
      .find({ adminID: req.body.adminID })
      .skip(skip)
      .sort({ _id: -1 })
      .limit(limit);

    const totalTasks = await taskSchema.countDocuments({
      adminID: req.body.adminID,
    });

    if (!tasks) {
      return res.status(404).json({ message: "error" });
    }

    res.status(200).json({
      tasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.body;

  try {
    const tasks = await taskSchema.findByIdAndDelete({ _id: id });

    if (!tasks) {
      res.status(404).json({ message: "error" });
    } else {
      res.status(202).json({ message: "done" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const updateTask = async (req, res) => {
  const { topic, name, email, address, country, id } = req.body;

  try {
    // Check if the email already exists in any other task (excluding the current task)
    const existingTask = await taskSchema.findOne({ email, _id: { $ne: id } });

    if (existingTask) {
      // Email already exists in another task, send a response indicating the issue
      res.status(409).json({ message: "Email already exists in another task" });
    } else {
      // Proceed with updating the task
      const updatedTask = await taskSchema.findByIdAndUpdate(
        id,
        {
          topic,
          name,
          email,
          address,
          country,
          isEditing: false,
        },
        { new: true } // Option to return the updated document
      );

      if (!updatedTask) {
        res.status(404).json({ message: "Task not found" });
      } else {
        res.status(202).json({
          message: "Task updated successfully",
          task: updatedTask,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const completeTask = async (req, res) => {
  const { id, completed } = req.body;

  try {
    const tasks = await taskSchema.findByIdAndUpdate(id, {
      completed: !completed,
    });

    if (!tasks) {
      res.status(404).json({ message: "error" });
    } else {
      res.status(202).json({ message: "done" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message, err: "this is error" });
  }
};
