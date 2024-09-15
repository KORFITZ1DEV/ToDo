import './App.css';
import ToDoPage from './Pages/TodoPage';
import "react-toastify/dist/ReactToastify.css";
import Navbar from './Components/Navbar';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import HomePage from './Pages/HomePage';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './Context/useAuth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Routes/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          {/* Navbar is placed here so it's visible on all pages */}
          <Navbar />
          <ToastContainer />

          {/* Routing Setup */}
          <Routes>
            {/* Public Routes: Login and Register */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/todo"
              element={
                <ProtectedRoute>
                  <ToDoPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

