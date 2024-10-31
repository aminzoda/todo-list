import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="Todo">
      <p
        onClick={toggleComplete}
        className={todo.completed ? "completed" : ""}
      >
        {todo.task}
      </p>
      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={editTodo} // Trigger prompt on click
          style={{ cursor: "pointer", marginRight: "10px" }}
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={deleteTodo} // Delete todo on click
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

// Define propTypes for the Todo component
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
