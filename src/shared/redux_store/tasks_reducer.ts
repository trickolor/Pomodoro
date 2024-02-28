import { createAction, createReducer } from "@reduxjs/toolkit";

export type TWeightUnit = {
  order: number;
  work: number;
  pause: number;
};

export type TAnimationFlags = {
  container: boolean;
  complete: boolean;
}

export type TTask = {
  name: string;
  taskOrder: number;
  editMode: boolean;
  menuOpen: boolean;
  deleteConfirm: boolean;
  firstMount: boolean;
  quantityChange: boolean;
  animationFlags: TAnimationFlags;
};

export type TTasksState = {
  all: TTask[];
};

const tasksState: TTasksState = {
  all: []
};

export const ADD_TASK = createAction<TTask>('ADD_TASK');
export const DECREASE_WORK_SECOND = createAction('DECREASE_WORK_SECOND');
export const DECREASE_PAUSE_SECOND = createAction('DECREASE_PAUSE_SECOND');
export const TOGGLE_EDIT_MODE = createAction<number>('START_EDIT');
export const TOGGLE_MENU_OPEN = createAction<number>('TOGGLE_MENU_OPEN');
export const TOGGLE_DELETE_CONFIRM = createAction<number>('TOGGLE_DELETE_CONFIRM');
export const DELETE_TASK = createAction<number>('DELETE_TASK');
export const DELETE_WEIGHT_UNIT = createAction<number>('DELETE_WEIGHT_UNIT');
export const TASK_CONTAINER_ANIMATION_FLAG = createAction('TASK_CONTAINER_ANIMATION_FLAG', (taskOrder: number, to: boolean) => {
  return {
    payload: {
      taskOrder,
      to
    }
  }
});

export const TASK_COMPLETE_ANIMATION_FLAG = createAction('TASK_COMPLETE_ANIMATION_FLAG', (taskOrder: number, to: boolean) => {
  return {
    payload: {
      taskOrder,
      to
    }
  }
});
export const EDIT_TASK_NAME = createAction('EDIT_TASK_NAME', (newName: string, taskOrder: number) => {
  return {
    payload: {
      newName,
      taskOrder
    }
  }
});

export const tasksReducer = createReducer(tasksState, (builder) => {
  builder
    .addCase(ADD_TASK, (state, action) => {
      state.all.push(action.payload);
    })
    .addCase(TOGGLE_EDIT_MODE, (state, action) => {
      state.all[action.payload].editMode = !state.all[action.payload].editMode;
    })
    .addCase(EDIT_TASK_NAME, (state, action) => {
      state.all[action.payload.taskOrder].name = action.payload.newName;
    })
    .addCase(DELETE_TASK, (state, action) => {
      const indexToDelete = state.all.findIndex(i => i.taskOrder === action.payload);

      state.all = state.all.filter(i => i.taskOrder !== action.payload);
      state.all.forEach((task, index) => {
        if (index >= indexToDelete) {
          task.taskOrder = index;
        }
      });
    })
    .addCase(TOGGLE_MENU_OPEN, (state, action) => {
      const task = state.all[action.payload];
      task.menuOpen = !task.menuOpen;
      state.all.forEach(t => {
        if (t !== task) {
          t.menuOpen = false;
        }
      });
    })
    .addCase(TOGGLE_DELETE_CONFIRM, (state, action) => {
      state.all[action.payload].deleteConfirm = !state.all[action.payload].deleteConfirm;
    })
    .addCase(TASK_CONTAINER_ANIMATION_FLAG, (state, action) => {
      const task = state.all.find((t) => t.taskOrder === action.payload.taskOrder);

      if (task) {
        task.animationFlags.container = action.payload.to;
      }
    })
    .addCase(TASK_COMPLETE_ANIMATION_FLAG, (state, action) => {
      const task = state.all.find((t) => t.taskOrder === action.payload.taskOrder);

      if (task) {
        task.animationFlags.complete = action.payload.to;
      }
    })
})
