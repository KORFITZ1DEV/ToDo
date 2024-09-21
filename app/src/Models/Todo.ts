export type ToDo = {
    id: number;
    whatToDo: string;
    reminders: string;
    toDoDate: string; 
    timeTodo: number;
    priority: string;
    status: string;
  }
  
  export type CreateToDo = {
    userID: string;
    whatToDo: string;
    reminders: string;
    toDoDate: string; 
    timeTodo: number;
    priority: string;
    status: string;
  }

  export type UpdateTodo = {
    whatToDo: string;
    reminders: string; 
    timeTodo: number;
    priority: string;
    status: string;
  }