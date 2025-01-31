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
import AltaEquipo from './components/AltaEquipo';
import ListadoEquipos from './components/ListadoEquipos';
import ModificarEquipo from './components/ModificarEquipo';


let router = createBrowserRouter([
  {
    path: "/",
    element : <Home />,
    errorElement : <PaginaError />,
    children: [
      {
        path: "/altaequipo",
        element: <AltaEquipo />
      },
      {
        path: "/listadoequipos",
        element: <ListadoEquipos />
      },
      {
        path: "/modificarequipo/:idequipo",
        element: <ModificarEquipo />
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

