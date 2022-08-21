import Logout from './components/auth/Logout'

const protectedRoutes = [
    {
        path: "/",
        element: <h1>Welcome User.</h1>,
    },
    {
        path: "/products",
        element: <h1>Products.</h1>,
    },
    {
        path: "/users",
        element: <h1>Users</h1>,
    },
    {
        path: "/logout",
        element: <Logout />,
    }
];

export default protectedRoutes