import App from "./App.jsx";
import { CheatForm } from "./components/CheatForm.jsx";
import { CheatPage } from "./pages/CheatPage.jsx";
import { ErrorPage } from "./pages/ErrorPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
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
            <HomePage />
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
        path: "/cheats/new",
        element: (
          <ProtectedRoute>
            <CheatForm />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },

      // 2. EDIT (Specific pattern)
      {
        path: "/cheats/:id/edit",
        element: (
          <ProtectedRoute>
            <CheatForm />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },

      // 3. VIEW (Variable ":id" catches everything else)
      {
        path: "/cheats/:id",
        element: (
          <ProtectedRoute>
            <CheatPage />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
];
