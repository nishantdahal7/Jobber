import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './contexts/AuthContext'
import { DatabaseProvider } from './contexts/DatabaseContext'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import { CreateJob } from './pages/Job/CreateJob'
import { EditJob } from './pages/Job/EditJob'
import { ViewJobBuyer } from './pages/Job/ViewJobBuyer'
import { ViewJobProvider } from './pages/Job/ViewJobProvider'
import { OnBoarding } from './pages/OnBoarding'
import Signup from './pages/SignUp'
import Start from './pages/Startingpage'
import UpdateProfile from './pages/UpdateProfile'

function App() {
  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <AuthProvider>
        <DatabaseProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path='/' element={<Start />} />
              <Route
                path='/dashboard'
                element={<PrivateRoute component={Dashboard} />}
              />
              <Route
                path='/update-profile'
                element={<PrivateRoute component={UpdateProfile} />}
              />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/onboard' element={<OnBoarding />} />
              <Route path='/job/create' element={<CreateJob />} />
              <Route path='/job/edit/:jobId' element={<EditJob />} />
              <Route
                path='/job/provider/view/:jobId'
                element={<ViewJobProvider />}
              />
              <Route path='/job/buyer/view/:jobId' element={<ViewJobBuyer />} />
            </Routes>
          </BrowserRouter>
        </DatabaseProvider>
      </AuthProvider>
    </Container>
  )
}
export default App
