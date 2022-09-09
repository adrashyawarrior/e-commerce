import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './admin/components/auth/Login';
import { protectedRoutes } from './Routes';

import RequireAuth from './admin/components/auth/RequireAuth';
import Dashboard from './admin/layouts/Dashboard';
import Home from './shop/components/Home';
import Main from './shop/layouts/Main';
import CustomerRegister from './shop/components/customers/CustomerRegister';
import CustomerLogin from './shop/components/customers/CustomerLogin';
import CustomerLogout from './shop/components/customers/CustomerLogout';
import Cart from './shop/components/cart/index';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          {/* Admin */}
          <Route element={<RequireAuth />}>
            {protectedRoutes.map((item, i) => {
              return (
                <Route key={"route-" + i} path={item.path} element={<Dashboard>{item.element}</Dashboard>} />
              )
            })}
          </Route>
          <Route path='/login' element={<Login />} />

          {/* Shop */}
          <Route path='/' element={<Main><Home /></Main>} />
          <Route path='/customers/login' element={<Main><CustomerLogin /></Main>} />
          <Route path='/customers/register' element={<Main><CustomerRegister /></Main>} />
          <Route path='/cart' element={<Main> <Cart /> </Main>} />
          <Route path='/customers/logout' element={<CustomerLogout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
