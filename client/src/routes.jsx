import App from "./App.jsx";

import { CategoryCheatsPage } from "./pages/CategoryCheatsPage.jsx";
import { CategoryCheatView } from "./pages/CategoryCheatView.jsx";
import { CategoryCheatForm } from "./components/CategoryCheatForm.jsx";
import { ErrorPage } from "./pages/ErrorPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { LanguageCheatsPage } from "./pages/LanguageCheatsPage.jsx";
import { LanguageCheatView } from "./pages/LanguageCheatView.jsx";
import { LanguageCheatForm } from "./components/LanguageCheatForm.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "/categories/:categoryId",
        element: <CategoryCheatsPage />,
        errorElement: <ErrorPage />,
      },

      {
        path: "/languages/:languageId",
        element: <LanguageCheatsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/categories/:categoryId/cheats/new",
        element: (
   
            <CategoryCheatForm />
      
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/languages/:languageId/cheats/new",
        element: <LanguageCheatForm />,
        errorElement: <ErrorPage />,
      },

      {
        path: "/categories/:categoryId/cheats/:cheatId",
        element: <CategoryCheatView />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/languages/:languageId/cheats/:cheatId",
        element: <LanguageCheatView />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/categories/:categoryId/cheats/:cheatId/edit",
        element: <CategoryCheatForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/languages/:languageId/cheats/:cheatId/edit",
        element: <LanguageCheatForm />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];
