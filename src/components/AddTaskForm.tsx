import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { addTask } from "../store/actions";
import { Task } from "../types";

const AddTaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks);

  const handleAddTask = () => {
    if (title.trim() === "") return;
    const maxId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) : 0;
    const newTask: Task = {
      id: maxId + 1,
      title: title,
      completed: false,
    };
    dispatch(addTask(newTask));
    setTitle("");
  };

  return (
    <div className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
        />
        <button className="btn btn-primary" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTaskForm;
