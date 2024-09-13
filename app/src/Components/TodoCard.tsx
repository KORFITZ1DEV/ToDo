import React, { useEffect, useState } from 'react';
import { ToDoDto } from '../Models/Todo'; // Adjust the path as needed

const ToDoCard = () => {
    const [todos, setTodos] = useState<ToDoDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data...');
                const response = await fetch('http://localhost:5257/api/todo/all');
                console.log('Response Status:', response.status);  // Log response status
                if (!response.ok) {
                    throw new Error('Failed to fetch ToDo items');
                }
                const data: ToDoDto[] = await response.json();
                console.log('Fetched Data:', data);  // Log fetched data
                setTodos(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error('Fetch Error:', err.message);  // Log fetch error
                    setError(err.message);
                } else {
                    console.error('Unknown Error:', err);  // Log unknown error
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-600">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            {todos.map((todo) => (
                <div key={todo.whatToDo} className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="mb-2 text-lg font-bold">{todo.whatToDo}</h2>
                    <p className="mb-2 text-gray-700">Reminders: {todo.reminders}</p>
                    <p className="mb-2 text-gray-500">
                        Date: {new Date(todo.toDoDate).toLocaleDateString()}
                    </p>
                    <p className="mb-2 text-gray-500">Time to do: {todo.timeTodo} min</p>
                    <p className={`mb-2 ${getPriorityStyle(todo.priority)}`}>
                        Priority: {todo.priority}
                    </p>
                    <p className={`font-semibold ${getStatusStyle(todo.status)}`}>
                        Status: {todo.status}
                    </p>
                </div>
            ))}
        </div>
    );
};

// Helper function to apply color styles based on priority
const getPriorityStyle = (priority: string) => {
    switch (priority) {
        case 'NotSet':
            return ' text-gray-800'
        case 'Must':
            return 'text-red-500';
        case 'Should':
            return 'text-yellow-500';
        case 'Could':
            return 'text-green-500';
        default:
            return 'text-gray-500';
    }
};

// Helper function to apply color styles based on status
const getStatusStyle = (status: string) => {
    switch (status) {
        case 'Completed':
            return 'text-green-600';
        case 'Pending':
            return 'text-orange-500';
        default:
            return 'text-gray-500';
    }
};

export default ToDoCard;
