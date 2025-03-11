import { Task } from '../types';
import { AppDispatch } from './store';

export const SET_TASKS = 'SET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const COMPLETE_TASK = 'COMPLETE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

interface SetTasksAction {
  type: typeof SET_TASKS;
  payload: Task[];
}

interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: Task;
}

interface CompleteTaskAction {
  type: typeof COMPLETE_TASK;
  payload: number;
}

interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: number;
}

export type TaskActionTypes = SetTasksAction | AddTaskAction | CompleteTaskAction | DeleteTaskAction;

export const setTasks = (tasks: Task[]): SetTasksAction => ({
  type: SET_TASKS,
  payload: tasks,
});

export const addTask = (task: Task): AddTaskAction => ({
  type: ADD_TASK,
  payload: task,
});

export const completeTask = (id: number): CompleteTaskAction => ({
  type: COMPLETE_TASK,
  payload: id,
});

export const deleteTask = (id: number): DeleteTaskAction => ({
  type: DELETE_TASK,
  payload: id,
});

export const initTasks = () => async (dispatch: AppDispatch) => {
  try {
    const localTasks = localStorage.getItem('tasks');


    const parsedTasks: Task[] | null = localTasks ? JSON.parse(localTasks) : null;

    if (parsedTasks && Array.isArray(parsedTasks) && parsedTasks.length > 0) {
      dispatch(setTasks(parsedTasks));
    } else {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();

      const tasks: Task[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        completed: item.completed,
      }));
      dispatch(setTasks(tasks));
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  } catch (error) {
    console.error('Error in initTasks:', error);
  }
};