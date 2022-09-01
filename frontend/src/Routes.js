import Logout from './admin/components/auth/Logout'
import ProductCreate from './admin/components/products/ProductCreate';
import ProductEdit from './admin/components/products/ProductEdit';
import ProductIndex from './admin/components/products/ProductIndex';
import UserCreate from './admin/components/users/UserCreate';
import UserIndex from './admin/components/users/UserIndex';


const protectedRoutes = [
    {
        path: "/",
        element: <h1>Welcome User.</h1>,
    },
    {
        path: "/users",
        element: <UserIndex />,
    },
    {
        path: "/users/create",
        element: <UserCreate />,
    },
    {
        path: "/products/:id/edit",
        element: <ProductEdit />,
    },
    {
        path: "/products",
        element: <ProductIndex />,
    },
    {
        path: "/products/create",
        element: <ProductCreate />,
    },
    {
        path: "/logout",
        element: <Logout />,
    }
];

export default protectedRoutes