import './App.css';
import ToDoPage from './Pages/TodoPage';

function App() {
  return (
    <div>
      <h1 className="px-5 py-5 m-10 text-3xl font-bold text-red-600 underline bg-slate-300">
        Simple React Typescript Tailwind Sample
      </h1>
      <ToDoPage />
    </div>
  );
}

export default App;
