import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="Todo">
      <p onClick={toggleComplete} className={todo.completed ? "completed" : ""}>
        {todo.task}
      </p>
      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editTodo(todo.id, todo.task)}
          style={{ cursor: "pointer", marginRight: "10px", marginLeft: "10px" }}
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={deleteTodo}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
