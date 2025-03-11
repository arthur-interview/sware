import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import { initTasks } from "./store/actions";
import { AppDispatch, RootState } from "./store/store";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(initTasks());
      hasFetched.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Task Manager</h1>
      <AddTaskForm />
      <TaskList />
    </div>
  );
};

export default App;
