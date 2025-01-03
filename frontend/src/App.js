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
import { SearchProvider } from './context/SearchBarContext';
import About from './pages/About';
const router = createBrowserRouter([
  {
    path: "/",
    element: <About/>,
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
  {path:"/search",element:<SearchResults/>},
  {path:"/*",element:<NotFound/>}
]);
function App() {
  return (
   <>
   <SearchProvider>

    <RouterProvider router={router}>
    </RouterProvider>
    <ToastContainer />
   </SearchProvider>
   </>
  );
}

export default App;
