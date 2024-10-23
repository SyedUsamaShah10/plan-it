import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { BsCheck2Circle } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";
import toast from "react-hot-toast";
import axios from "axios";

function ToDoItem(props) {
  const [flag, setFlag] = useState(false);
  const [updateInput, setUpdateInput] = useState(props.text);

  function handleChange(event) {
    const newValue = event.target.value;
    setUpdateInput(newValue);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleUpdateTask();
    }
  };

  const handleUpdateTask = () => {
    if (updateInput.trim()) {
      updateItem(props.id);
      setUpdateInput("");
      setFlag(false);
    } else {
      toast.error("Please enter a todo");
    }
  };

  const updateItem = async (id) => {
    try {
      debugger;
      const response = await axios.put(
        `http://localhost:5000/updateTodo/${id}`,
        {
          data: updateInput,
        }
      );

      if (response.status === 200) {
        toast.success("Todo Updated");
        props.fetchTodos();
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Error updating todo");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {flag ? (
        <div className="form">
          <div style={{ display: "flex", alignContent: "end" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <BsCheck2Circle
                style={{
                  cursor: "pointer",
                  color: "#9B1B30",
                  fontSize: "24px",
                  // marginRight: "5px",
                }}
                onClick={() => handleUpdateTask()}
              />
              <RxCrossCircled
                style={{
                  cursor: "pointer",
                  color: "#3B3C28",
                  fontSize: "24px",
                }}
                onClick={() => setFlag(!flag)}
              />
            </div>
            <input
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              type="text"
              value={updateInput}
            />
          </div>
        </div>
      ) : (
        <li>{props.text}</li>
      )}

      <div>
        <RiDeleteBinLine
          style={{ cursor: "pointer", color: "#E63946", marginRight: "5px" }}
          onClick={() => {
            props.onDelete(props.id);
          }}
        />
        <FaRegEdit
          style={{ cursor: "pointer", color: "#004D4D" }}
          onClick={() => setFlag(!flag)}
        />
      </div>
    </div>
  );
}

export default ToDoItem;
