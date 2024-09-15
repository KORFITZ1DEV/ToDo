import ToDoCard from '../Components/TodoCard';

const ToDoPage = () => {
    return (
        <div className='mx-8'>
            <h2 className="px-5 py-5 m-5 text-2xl font-bold border-b-2">To-Do List</h2>
            <ToDoCard />
        </div>
    );
};

export default ToDoPage;
