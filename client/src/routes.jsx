import App from "./App.jsx";

import { CategoryCheatsPage } from "./pages/CategoryCheatsPage.jsx";
import { CategoryCheatView } from "./pages/CategoryCheatView.jsx";
import { CategoryCheatForm } from "./components/CategoryCheatForm.jsx";
import { ErrorPage } from "./pages/ErrorPage.jsx";
import { HomePage2 } from "./pages/HomePage2.jsx";
import { LanguageCheatsPage } from "./pages/LanguageCheatsPage.jsx";
import { LanguageCheatView } from "./pages/LanguageCheatView.jsx";
import { LanguageCheatForm } from "./components/LanguageCheatForm.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { ProtectedRoute } from "./components/ProtectedRoutes.jsx";
import { SignupPage } from "./pages/SignupPage.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage2 />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
        errorElement: <ErrorPage />,
      },

 
    {
        path: "/categories/:categoryId",
        element: (
          <ProtectedRoute>
            <CategoryCheatsPage />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
        
  {
        path: "/languages/:languageId",
        element: (
          <ProtectedRoute>
            <LanguageCheatsPage />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/categories/:categoryId/cheats/new",
        element: (
          <ProtectedRoute>
            <CategoryCheatForm />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
             {
        path: "/languages/:languageId/cheats/new",
        element: (
          <ProtectedRoute>
            <LanguageCheatForm />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },

 {
        path: "/categories/:categoryId/cheats/:cheatId",
        element: (
          <ProtectedRoute>
            <CategoryCheatView />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },{
        path: "/languages/:languageId/cheats/:cheatId",
        element: (
          <ProtectedRoute>
            <LanguageCheatView />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
        {
        path: "/categories/:categoryId/cheats/:cheatId/edit",
        element: (
          <ProtectedRoute>
            <CategoryCheatForm />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
         {
        path: "/languages/:languageyId/cheats/:cheatId/edit",
        element: (
          <ProtectedRoute>
            <LanguageCheatForm />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
];
