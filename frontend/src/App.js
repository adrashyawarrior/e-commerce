import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './layouts/Navbar';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<h1>Home</h1>} />
          <Route path='/products' element={<h1>Products</h1>} />
          <Route path='/users' element={<h1>Users</h1>} />
          <Route path='/logout' element={<h1>Logout</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
