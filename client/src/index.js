import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import UserProfile from './pages/UserProfile';
import CreatePosts from './pages/CreatePost';
import CategoryPosts from './pages/CategoryPosts';
import DashBoard from './pages/Dashboard';
import EditPost from './pages/EditPosts';
import DeletePost from './pages/DeletePost';
import Logout from './pages/Logout'; // Assuming you have these components
import Login from './pages/Login';
import Authors from './pages/Authors';
import AuthorPosts from './pages/AuthorPosts';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register';
import UserProvider from './context/userContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider><Layout/></UserProvider>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> }, // Home as the index route
      { path: "posts/:id", element: <PostDetail /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "profile/:id", element: <UserProfile /> },
      { path: "authors", element: <Authors /> },
      { path: "create", element: <CreatePosts /> },
      { path: "posts/categories/:category", element: <CategoryPosts /> },
      { path: "posts/user/:id", element: <AuthorPosts /> },
      { path: "myposts/sdfdfe", element: <DashBoard /> },
      { path: "posts/:id/edit", element: <EditPost /> }, 
      { path: "posts/:id/delete", element: <DeletePost /> }, 
      { path: "logout", element: <Logout /> }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
