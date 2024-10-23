import axios from "axios";
import React, { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";
import toast from "react-hot-toast";

function App() {
  const [items, setItems] = useState([]);

  function addItem(inputText) {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
    fetchTodos();
  }

  const fetchTodos = () => {
    debugger;
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setItems(data?.todos);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteItem = (id) => {
    axios.delete("http://localhost:5000/deleteTodo/" + id).then((response) => {
      toast.success("Todo Deleted");
      fetchTodos();
    });
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>Plan It</h1>
      </div>
      <InputArea onAdd={addItem} fetchTodos={fetchTodos} />
      <div>
        <ul>
          {items?.map((todoItem, index) => (
            <ToDoItem
              key={todoItem?._id}
              id={todoItem?._id}
              text={todoItem?.data}
              onDelete={deleteItem}
              fetchTodos={fetchTodos}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
