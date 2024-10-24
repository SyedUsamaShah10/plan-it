import Todo from "../model/Todo.js";

export const getAllTasks = async (req, res) => {
  try {
    const todos = await Todo.find({});
    return res.status(200).json({ todos: todos });
  } catch (error) {
    console.error("Error in getAllTasks controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addTask = async (req, res) => {
  console.log("BODY", req.body);
  const todo = new Todo({
    data: req.body.data,
  });

  let savedItem = await todo.save();

  res.send({
    savedItem,
    status: 1,
    message: "Todo Created!",
  });
  console.log("savedItem", savedItem);
};

export const deleteTask = async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  res.status(200).json({ status: 1, message: "Todo Deleted Successfully" });
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { data },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).send({
        status: 0,
        message: "Todo not found!",
      });
    }

    res.send({
      updatedTodo,
      status: 200,
      message: "Todo updated successfully!",
    });
  } catch (error) {
    console.error("Error updating Todo:", error);
    res.status(500).send({
      status: 0,
      message: "An error occurred while updating the Todo.",
    });
  }
};
