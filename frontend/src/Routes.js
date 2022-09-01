import Logout from './admin/components/auth/Logout'
import ProductCreate from './admin/components/products/ProductCreate';
import ProductEdit from './admin/components/products/ProductEdit';
import ProductIndex from './admin/components/products/ProductIndex';
import UserCreate from './admin/components/users/UserCreate';
import UserEdit from './admin/components/users/UserEdit';
import UserIndex from './admin/components/users/UserIndex';

const protectedRoutes = [
    // Main Routes ===================
    {
        path: "/",
        element: <h1>Welcome User.</h1>,
    },

    // Users Routes ===================
    {
        path: "/users/:id/edit",
        element: <UserEdit />,
    },
    {
        path: "/users",
        element: <UserIndex />,
    },
    {
        path: "/users/create",
        element: <UserCreate />,
    },

    // Products Routes =================
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

    // Auth Routes =====================
    {
        path: "/logout",
        element: <Logout />,
    }
];

export default protectedRoutes