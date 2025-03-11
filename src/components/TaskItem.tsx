import React from "react";
import { useDispatch } from "react-redux";
import { completeTask, deleteTask } from "../store/actions";
import { Task } from "../types";
import { AppDispatch } from "../store/store";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <div
      className={`list-group-item ${
        task.completed ? "list-group-item-success" : ""
      } d-flex justify-content-between align-items-center`}
    >
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.title}
      </span>
      <div>
        <span
          className={`badge ${
            task.completed ? "bg-success" : "bg-warning"
          } me-2`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
        {!task.completed && (
          <button
            className="btn btn-sm btn-outline-success me-2"
            onClick={() => dispatch(completeTask(task.id))}
          >
            Complete
          </button>
        )}
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
