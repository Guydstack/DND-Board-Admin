import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
  Route,
  Navigate
} from "react-router-dom";
import { Suspense , lazy, useContext } from 'react';
const Products = lazy(() => import('./page/privateRoutes/Products'));
const Contact = lazy(() => import('./page/privateRoutes/Contact-Forms'));
const Orders = lazy(() => import("./page/privateRoutes/Orders"));
const Login = lazy(() => import("./page/publicRoutes/Login"));
const Categories = lazy(() => import("./page/privateRoutes/Categories"));
const Users = lazy(() => import("./page/privateRoutes/Users"));
const Report = lazy(() => import("./page/privateRoutes/Report"));
import Nav from "./components/section/Nav";
import { AuthContext } from "./context/AuthContext";
import useAuth from "./hooks/useAuth";
import Spinner from "./hooks/Spinner";

const Root = ({isAuth}) => 
<>
{isAuth && <Nav />} 

<Outlet /> 
</>

function App() {
  
  useAuth()
  
  const {isAuth, onLoad} = useContext(AuthContext)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root isAuth={isAuth} />}>

        <Route errorElement={<Login />} element={isAuth ? <Navigate to={"/products"}/> : <Outlet />}>
          <Route index element={!onLoad ? <Suspense fallback={<Spinner />}></Suspense> : <Login />} />

        </Route>

        <Route element={isAuth ? <Outlet /> : <Navigate to={"/"} />}>
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/users" element={<Users />} />
          <Route path="/contact-forms" element={<Contact />} />
          <Route path="/report" element={<Report />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
    <Suspense fallback={<Spinner />}>
     <RouterProvider router={router} />
    </Suspense>
    </>
  )
}

export default App
