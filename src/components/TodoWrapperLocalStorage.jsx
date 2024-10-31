import { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";

export const TodoWrapperLocalStorage = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    return savedTodos;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task) => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), task, completed: false },
    ];
    setTodos(newTodos); // This triggers the useEffect to save
  };

  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos); // This triggers the useEffect to save
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos); // This triggers the useEffect to save
  };

  const editTask = (newTask, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task: newTask } : todo
    );
    setTodos(newTodos); // This triggers the useEffect to save
  };

  return (
    <div className="TodoWrapper">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          deleteTodo={() => deleteTodo(todo.id)}
          editTodo={() => {
            const newTask = prompt("Edit Task", todo.task);
            if (newTask !== null && newTask.trim()) {
              editTask(newTask, todo.id);
            }
          }}
          toggleComplete={() => toggleComplete(todo.id)}
        />
      ))}
    </div>
  );
};
