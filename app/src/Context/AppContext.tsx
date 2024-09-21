import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import React from "react";
import { CreateToDo, ToDo, UpdateTodo } from '../Models/Todo';
import { CreateToDoAPI, DeleteToDoAPI, GetUsersToDos, UpdateToDoAPI } from "../Services/ToDoService";
import { useAuth } from "./useAuth";  // Import useAuth for user info

type AppContextType = {
    toDos: ToDo[] | null;                // Array of ToDo items
    createToDo: (todo: CreateToDo) => void; // Create a new ToDo
    updateToDo: (id: number, updatedTodo: UpdateTodo) => void;  // Update a ToDo by ID
    deleteToDo: (id: number) => void;    // Delete a ToDo by ID
    getUsersToDos: () => void;           // Fetch ToDos for the logged-in user
};

type Props = { children: React.ReactNode };

const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider = ({ children }: Props) => {
    const [toDos, setToDos] = useState<ToDo[] | null>(null); // State to store all ToDo items
    const [isReady, setIsReady] = useState(false);  // Ready state for context initialization
    const { user } = useAuth();  // Use auth context to get the current user
    const userID = user?.userID; // Get the user ID from the auth context

    // Fetch the user's ToDos when the component is mounted or when the userID changes
    useEffect(() => {
        if (userID) {
            getUsersToDos(); // Fetch ToDos when user logs in
        }
        setIsReady(true);
    }, [userID]);

    // Fetch all ToDos for the logged-in user
    const getUsersToDos = async () => {
        if (!userID) {
            toast.warning("User not logged in");
            return;
        }

        try {
            const res = await GetUsersToDos(userID); // Call the API to fetch ToDos
            if (res?.data) {
                setToDos(res.data); // Set fetched ToDos in state
                toast.success("Fetched ToDos successfully");
            }
        } catch (error) {
            toast.error("Error fetching ToDos");
        }
    };

    // Create a new ToDo
    const createToDo = async (todo: CreateToDo) => {
        try {
            const res = await CreateToDoAPI(todo); // Call the API to create ToDo
            if (res?.data) {
                // Add the new ToDo to the current list of ToDos
                setToDos((prevToDos) => prevToDos ? [...prevToDos, res.data] : [res.data]);
                toast.success("ToDo created successfully");
            }
        } catch (error) {
            toast.error("Error creating ToDo");
        }
    };

    // Update an existing ToDo by ID
    const updateToDo = async (id: number, updatedTodo: UpdateTodo) => {
        try {
            const res = await UpdateToDoAPI(id, updatedTodo); // Call the API to update the ToDo
            if (res?.data) {
                // Update the ToDo in state
                setToDos((prevToDos) =>
                    prevToDos?.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo)) || []
                );
                toast.success("ToDo updated successfully");
            }
        } catch (error) {
            toast.error("Error updating ToDo");
        }
    };

    // Delete a ToDo by ID
    const deleteToDo = async (id: number) => {
        try {
            const res = await DeleteToDoAPI(id);  // Call the API to delete the ToDo
            if (res?.data) {
                // Remove the deleted ToDo from the state
                setToDos((prevToDos) => prevToDos?.filter((todo) => todo.id !== id) || []);
                toast.success("ToDo deleted successfully");
            }
        } catch (error) {
            toast.error("Error deleting ToDo");
        }
    };

    return (
        <AppContext.Provider value={{ toDos, createToDo, updateToDo, deleteToDo, getUsersToDos }}>
            {isReady ? children : null}
        </AppContext.Provider>
    );
};

// Hook to use the AppContext in other components
export const useApp = () => React.useContext(AppContext);
