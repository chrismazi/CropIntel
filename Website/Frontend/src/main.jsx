import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ComponentTests from './pages/ComponentTests';

import store from './store'
import { Provider } from 'react-redux'

import Unauthenticated from './components/Unauthenticated';
import Login from './pages/Login';
import Home from './pages/Home';
import Authenticated from './components/Authenticated';
import Register from './pages/Register';
import Dashboard from "./pages/Home/Dashboard/index.jsx";
import Crops from './pages/Home/Crops/index.jsx';
import CropRecommendation from './pages/Home/CropRecommendation/index.jsx';


const router = createBrowserRouter([
  {
    path: "/components-tests",
    element: <ComponentTests/>,
  },
  
  {
    path: '/login',
    element: <Unauthenticated><Login/></Unauthenticated>
  },
  {
    path: '/register',
    element: <Unauthenticated><Register/></Unauthenticated>
  },
  {
    path: '/',
    element: <Authenticated><Home /></Authenticated>,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/crops',
        element: <Crops/>
      },
      {
        path: '/crops-recommendation',
        element: <CropRecommendation/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
