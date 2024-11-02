import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const TodoForm = ({ addTodo, isEditing, currentTask }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (isEditing) {
      setInput(currentTask);
    } else {
      setInput("");
    }
  }, [isEditing, currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="todo-input"
        placeholder={isEditing ? "Edit task..." : "Create a new task..."}
      />
      <button className="todo-btn" type="submit">
        {isEditing ? "Update" : "Add"}
      </button>
    </form>
  );
};

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  currentTask: PropTypes.string,
};
