
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from '../components/Protected'
import TaskList from '../components/task/TaskList'
import CreateTask from '../components/task/CreateTask'
import Profile from '../components/users/Profile'
import MyTasks from '../components/task/MyTasks'
import AllUsers from '../components/users/AllUsers'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/' element={<Login />}></Route>

        <Route path='/protected' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route path='tasks' element={<TaskList />} />
          <Route path='create-task' element={<CreateTask />} />
          <Route path='profile' element={<Profile />} />
          <Route path='my-tasks' element={<MyTasks />} />
          <Route path='users' element={<AllUsers />} />


        </Route>

      </Routes>


    </BrowserRouter>
  )
}

export default App