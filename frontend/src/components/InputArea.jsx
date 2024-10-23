import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

function InputArea(props) {
  const [inputText, setInputText] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  const createTodo = (data) => {
    axios
      .post("http://localhost:5000/createTodo", {
        data: inputText,
      })
      .then((response) => {
        toast.success("Todo Created");
        props.fetchTodos();
      })
      .catch((error) => {
        toast.error("Error creating todo");
      });
  };

  const handleAddTask = () => {
    if (inputText.trim()) {
      console.log(inputText);
      props.onAdd(inputText);
      createTodo(inputText);
      setInputText("");
    } else {
      toast.error("Please enter a todo");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="form">
      <input
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        type="text"
        value={inputText}
      />
      <button onClick={handleAddTask} style={{ cursor: "pointer" }}>
        <span>Add</span>
      </button>
      <Toaster />
    </div>
  );
}

export default InputArea;
