import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './layouts/Navbar';
import AuthenticatedComponents from './components/auth/AuthenticatedComponents';
import Logout from './components/auth/Logout';
import Login from './components/auth/Login';
import AuthUser from './components/auth/AuthUser';

function App() {
  return (
    <div>
      <BrowserRouter>
        {AuthUser ? <Navbar /> : ''}
        <Routes>
          <Route element={<AuthenticatedComponents />}>
            <Route path='/' element={<h1>{`Welcome back, ${AuthUser.name}.`}</h1>} />
            <Route path='/products' element={<h1>Products</h1>} />
            <Route path='/users' element={<h1>Users</h1>} />
            <Route path='/logout' element={<Logout />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
