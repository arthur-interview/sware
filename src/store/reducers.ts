import { Task } from '../types';
import { TaskActionTypes, SET_TASKS, ADD_TASK, COMPLETE_TASK, DELETE_TASK } from './actions';

export interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export default function taskReducer(state = initialState, action: TaskActionTypes): TaskState {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, tasks: action.payload };
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case COMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: true } : task
        ),
      };
    case DELETE_TASK:
      const newTasks = state.tasks.filter(task => task.id !== action.payload);
      return { ...state, tasks: newTasks };
    default:
      return state;
  }
}