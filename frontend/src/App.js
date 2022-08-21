import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './components/auth/Login';
import protectedRoutes from './Routes';

import AuthenticatedComponents from './components/auth/AuthenticatedComponents';
import Dashboard from './layouts/Dashboard';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthenticatedComponents />}>
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
