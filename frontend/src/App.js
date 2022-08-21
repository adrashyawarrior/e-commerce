import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './admin/components/auth/Login';
import protectedRoutes from './Routes';

import RequireAuth from './admin/components/auth/RequireAuth';
import Dashboard from './admin/layouts/Dashboard';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<RequireAuth />}>
            {protectedRoutes.map((item, i) => {
              return (
                <Route key={"route-" + i} path={item.path} element={<Dashboard>{item.element}</Dashboard>} />
              )
            })}
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
