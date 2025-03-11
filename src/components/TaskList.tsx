import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);

  return (
    <div className="list-group">
      <div className="list-group">
        {" "}
        {tasks.map((task) => (
          <TaskItem task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
