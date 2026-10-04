import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  function addTodo() {
    if (todo.trim() === "") {
      return;
    }

    const parts = todo.trim().split(" ");
    const lastPart = parts[parts.length - 1];
    const number = Number(lastPart);

    if (!isNaN(number) && number > 0) {
      const taskName = parts.slice(0, -1).join(" ");

      const newTodos = [];

      for (let i = 0; i < number; i++) {
        newTodos.push({
          text: taskName,
          updateCount: 0,
          editing: false,
        });
      }

      setTodos([...todos, ...newTodos]);
    } else {
      const newTodo = {
        text: todo,
        updateCount: 0,
        editing: false,
      };

      setTodos([...todos, newTodo]);
    }

    setTodo("");
  }

  function deleteTodo(index) {
    const newTodos = todos.filter((item, i) => i !== index);
    setTodos(newTodos);
  }

  function editTodo(index) {
    const newTodos = [...todos];
    newTodos[index].editing = true;
    setTodos(newTodos);
  }

  function updateTodo(index, newText) {
    const newTodos = [...todos];

    newTodos[index].text = newText;
    newTodos[index].updateCount =
      newTodos[index].updateCount + 1;
    newTodos[index].editing = false;

    setTodos(newTodos);
  }

  return (
    <div className="todo-container">

      <h1>Todo App</h1>

      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter todo"
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
        />

        <button
          className="add-button"
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      {todos.map((item, index) => (
        <div className="todo-item" key={index}>

          {item.editing ? (
            <input
              type="text"
              defaultValue={item.text}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  updateTodo(index, event.target.value);
                }
              }}
            />
          ) : (
            <>
              <div className="todo-text">
                <strong>{item.text}</strong>

                <div className="update-count">
                  Updated {item.updateCount} times
                </div>
              </div>

              <div className="todo-buttons">

                <button
                  className="edit-button"
                  onClick={() => editTodo(index)}
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() => deleteTodo(index)}
                >
                  Delete
                </button>

              </div>
            </>
          )}

        </div>
      ))}

    </div>
  );
}

export default App;
