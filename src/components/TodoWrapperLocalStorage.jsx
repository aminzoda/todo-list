import { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal"; // Import the modal component

export const TodoWrapperLocalStorage = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    return savedTodos;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task) => {
    if (isEditing) {
      const newTodos = todos.map((todo) =>
        todo.id === editingId ? { ...todo, task } : todo
      );
      setTodos(newTodos);
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newTodos = [
        ...todos,
        { id: uuidv4(), task, completed: false },
      ];
      setTodos(newTodos);
    }
  };

  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    setShowDeleteModal(true);
    setDeleteId(id); // Set the id of the todo to be deleted
  };

  const confirmDelete = () => {
    setTodos(todos.filter((todo) => todo.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const editTodo = (id, task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setEditingId(id);
  };

  return (
    <div className="TodoWrapper">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} isEditing={isEditing} currentTask={currentTask} />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          deleteTodo={() => deleteTodo(todo.id)}
          editTodo={() => editTodo(todo.id, todo.task)}
          toggleComplete={() => toggleComplete(todo.id)}
        />
      ))}
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
