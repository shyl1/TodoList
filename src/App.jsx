import Login from './components/Login/loginComponents/Login.jsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './components/AuthenticationContext.jsx';
import './App.css';
import DashBoard from './components/Dashboardcomponents/Dashboard/DashBoard.jsx';
import SignUp from './components/SignUp/SignUpComonents/SignUp.jsx';
import { ProtectedRoutes } from './utils/ProtectedRoutes.jsx';
import DashboardLayout from './components/Dashboardcomponents/Dashboard/DashboardLayout/DashboardLayout.jsx';
import Profile from './components/Dashboardcomponents/Dashboard/Profile/Profile.jsx';
import { TaskProvider } from './components/TaskContext';
import { UserProvider } from './components/UserContext.jsx';


function App() {

  
  return (
    <>
    <UserProvider>
      <TaskProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />}/>
              <Route path='/signup' element={<SignUp />}/>
              <Route element={<ProtectedRoutes/>}>
                <Route path='/dashboard' 
                element={<DashboardLayout />}>
                  <Route index element={<DashBoard/>}/>
                  <Route path='profile' element={<Profile/>}/>

                </Route>
              </Route>
            </Routes>
            </BrowserRouter>
        </AuthProvider>
      </TaskProvider>
      </UserProvider>  
    </>
  )
}

export default App
