import mongoose from "mongoose";
const schema = new mongoose.Schema({
  data: {
    type: String,
  },
});
const Todo = new mongoose.model("Todo", schema);

export default Todo;
