import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import UploadVid from './pages/UploadVid';
import Myvideos from './pages/Myvideos';
import Subscriptions from './pages/Subscriptions';
import Video from './pages/Video';
import NotFound from './pages/NotFound';
import SearchResults from './pages/SearchResults';
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/signin",
    element: <Signin/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {path:"/home",element:<Home/>,},
  {path:"/upload",element:<UploadVid/>},
  {path:"/myvideos",element:<Myvideos/>},
  {path:"/subscriptions",element:<Subscriptions/>},
  {path:"/video/:vid",element:<Video/>},
  {path:"/notfound",element:<NotFound/>},
  {path:"/search",element:<SearchResults/>}
]);
function App() {
  return (
   <>
    <RouterProvider router={router}>
    </RouterProvider>
    <ToastContainer />
   </>
  );
}

export default App;
