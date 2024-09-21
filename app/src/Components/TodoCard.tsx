import { useState } from 'react';
import { ToDo, UpdateTodo } from '../Models/Todo'; // Adjust the path as needed
import { useApp } from '../Context/AppContext'; // Import the useApp hook from context

const ToDoCard = () => {
    const { toDos, deleteToDo, updateToDo } = useApp(); // Use AppContext methods
    const [loading, setLoading] = useState(false); // Loading state if needed

    const handleDelete = async (id: number) => {
        setLoading(true);
        deleteToDo(id); // Call the delete function from context
        setLoading(false);
    };

    const handleUpdate = async (id: number) => {
        const updatedTodo: UpdateTodo = {
            whatToDo: "Updated Task", // You can replace this with a form input or other dynamic values
            reminders: "Updated Reminder",
            timeTodo: 45,
            priority: "Should",
            status: "Pending"
        };
        setLoading(true);
        updateToDo(id, updatedTodo); // Call the update function from context
        setLoading(false);
    };

    if (loading) {
        return <div className="text-center text-gray-600">Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            {toDos?.map((todo) => (
                <div key={todo.id} className="p-6 bg-white shadow-md rounded-2xl">
                    <h2 className="mb-2 text-lg font-bold text-gray-900">{todo.whatToDo}</h2>
                    <p className="mb-2 text-gray-900">Reminders: {todo.reminders}</p>
                    <p className="mb-2 text-gray-900">
                        Date: {new Date(todo.toDoDate).toLocaleDateString()}
                    </p>
                    <p className="mb-2 text-gray-900">Time to do: {todo.timeTodo} min</p>
                    <p className={`mb-2 ${getPriorityStyle(todo.priority)}`}>
                        Priority: {todo.priority}
                    </p>
                    <p className={`font-semibold ${getStatusStyle(todo.status)}`}>
                        Status: {todo.status}
                    </p>

                    {/* Add buttons for updating and deleting */}
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => handleUpdate(todo.id)}
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => handleDelete(todo.id)}
                            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Helper function to apply color styles based on priority
const getPriorityStyle = (priority: string) => {
    switch (priority) {
        case 'NotSet':
            return 'text-gray-800';
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
