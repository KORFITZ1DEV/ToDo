// src/models/ToDoDto.ts

export interface ToDoDto {
    whatToDo: string;
    reminders: string;
    toDoDate: string; // It's better to store dates as strings because they'll come from the API in ISO format.
    timeTodo: number;
    priority: string;
    status: string;
  }
  