import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './pages/Home';
import PaginaError from './pages/PaginaError';


let router = createBrowserRouter([
  {
    path: "/",
    element : <Home />,
    errorElement : <PaginaError />,
    children: [
      {
        // path: "shows/:showId",
        // element: <Show />
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

