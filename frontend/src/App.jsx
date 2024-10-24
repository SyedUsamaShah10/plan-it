import axios from "axios";
import { useEffect, useState } from "react";
import ToDoItem from "./components/ToDoItem";
import InputArea from "./components/InputArea";
import toast from "react-hot-toast";

function App() {
  const [items, setItems] = useState([]);

  function addItem(inputText) {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
    fetchTodos();
  }

  const fetchTodos = async () => {
    try {
      const res = await fetch("/api");
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      setItems(data?.todos);
    } catch (error) {
      console.log("Failed to load todos");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteItem = (id) => {
    axios.delete("http://localhost:5000/api/deleteTodo/" + id).then(() => {
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
          {items?.map((todoItem) => (
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
