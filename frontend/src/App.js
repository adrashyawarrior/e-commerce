import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthenticatedComponents from './components/auth/AuthenticatedComponents';
import Logout from './components/auth/Logout';
import Login from './components/auth/Login';
import Dashboard from './layouts/Dashboard';

function App() {
  const auth = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : false;
  return (
    <div>
      <BrowserRouter>
        <Dashboard>
          <Routes>
            <Route element={<AuthenticatedComponents />}>
              <Route path='/' element={<h1>{`Welcome back, ${auth.name}.`}</h1>} />
              <Route path='/products' element={<h1>Products</h1>} />
              <Route path='/users' element={<h1>Users</h1>} />
              <Route path='/logout' element={<Logout />} />
            </Route>
          </Routes>
        </Dashboard>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
