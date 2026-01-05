// Save as: src/components/DebugBox.jsx

import { useLocation, useParams } from "react-router-dom"

// Add your routes here so the debug box knows about them
const ROUTE_INFO = {
  "/": {
    component: "HomePage",
    hooks: ["useAuth", "useNavigate"],
    cameFrom: "Login or direct",
    goesTo: ["/categories/:id", "/languages/:id"]
  },
  "/login": {
    component: "LoginPage",
    hooks: ["useState", "useAuth"],
    cameFrom: "Direct or redirect",
    goesTo: ["/"]
  },
  "/signup": {
    component: "SignupPage",
    hooks: ["useState"],
    cameFrom: "Login page link",
    goesTo: ["/login", "/"]
  },
  "/categories/:categoryId": {
    component: "CategoryCheatsPage",
    hooks: ["useParams", "useAuth", "useNavigate"],
    cameFrom: "HomePage category button",
    goesTo: ["/categories/:id/cheats/new", "/categories/:id/cheats/:cheatId", "/categories/:id/cheats/:cheatId/edit"]
  },
  "/languages/:languageId": {
    component: "LanguageCheatsPage",
    hooks: ["useParams", "useAuth", "useNavigate"],
    cameFrom: "HomePage language button",
    goesTo: ["/languages/:id/cheats/new", "/languages/:id/cheats/:cheatId", "/languages/:id/cheats/:cheatId/edit"]
  },
  "/categories/:categoryId/cheats/new": {
    component: "CategoryCheatForm",
    hooks: ["useParams", "useState", "useAuth"],
    cameFrom: "CategoryCheatsPage 'New' link",
    goesTo: ["/categories/:id"]
  },
  "/languages/:languageId/cheats/new": {
    component: "LanguageCheatForm",
    hooks: ["useParams", "useState", "useAuth"],
    cameFrom: "LanguageCheatsPage 'New' link",
    goesTo: ["/languages/:id"]
  },
  "/categories/:categoryId/cheats/:cheatId": {
    component: "CategoryCheatView",
    hooks: ["useParams", "useAuth"],
    cameFrom: "CategoryCheatsPage 'View' button",
    goesTo: ["/categories/:id", "/categories/:id/cheats/:cheatId/edit"]
  },
  "/languages/:languageId/cheats/:cheatId": {
    component: "LanguageCheatView",
    hooks: ["useParams", "useAuth"],
    cameFrom: "LanguageCheatsPage 'View' button",
    goesTo: ["/languages/:id", "/languages/:id/cheats/:cheatId/edit"]
  },
  "/categories/:categoryId/cheats/:cheatId/edit": {
    component: "CategoryCheatForm",
    hooks: ["useParams", "useState", "useEffect", "useAuth"],
    cameFrom: "CategoryCheatsPage 'Edit' button",
    goesTo: ["/categories/:id"]
  },
  "/languages/:languageId/cheats/:cheatId/edit": {
    component: "LanguageCheatForm",
    hooks: ["useParams", "useState", "useEffect", "useAuth"],
    cameFrom: "LanguageCheatsPage 'Edit' button",
    goesTo: ["/languages/:id"]
  }
}

// Match current URL to a route pattern
function matchRoute(pathname) {
  // Try exact match first
  if (ROUTE_INFO[pathname]) return ROUTE_INFO[pathname]
  
  // Try pattern matching
  for (const pattern of Object.keys(ROUTE_INFO)) {
    const regex = new RegExp(
      "^" + pattern.replace(/:[^/]+/g, "[^/]+") + "$"
    )
    if (regex.test(pathname)) {
      return ROUTE_INFO[pattern]
    }
  }
  return null
}

export function DebugBox() {
  const location = useLocation()
  const params = useParams()
  const info = matchRoute(location.pathname)

  return (
    <div style={{
      position: "fixed",
      bottom: "10px",
      right: "10px",
      width: "350px",
      maxHeight: "400px",
      overflow: "auto",
      background: "#111",
      color: "#0f0",
      padding: "15px",
      fontSize: "12px",
      fontFamily: "monospace",
      borderRadius: "8px",
      border: "2px solid #0f0",
      zIndex: 9999
    }}>
      <div style={{color: "#ff0", fontWeight: "bold", marginBottom: "10px"}}>
        🐛 DEBUG
      </div>

      <div style={{marginBottom: "6px"}}>
        <span style={{color: "#ff0"}}>URL:</span> {location.pathname}
      </div>

      {info ? (
        <>
          <div style={{marginBottom: "6px"}}>
            <span style={{color: "#ff0"}}>COMPONENT:</span> {info.component}
          </div>

          <div style={{marginBottom: "6px"}}>
            <span style={{color: "#ff0"}}>HOOKS:</span> {info.hooks.join(", ")}
          </div>

          {Object.keys(params).length > 0 && (
            <div style={{marginBottom: "6px"}}>
              <span style={{color: "#ff0"}}>PARAMS:</span>
              {Object.entries(params).map(([k, v]) => (
                <div key={k} style={{marginLeft: "10px"}}>{k} = {v}</div>
              ))}
            </div>
          )}

          <div style={{marginBottom: "6px"}}>
            <span style={{color: "#ff0"}}>CAME FROM:</span> {info.cameFrom}
          </div>

          <div>
            <span style={{color: "#ff0"}}>GOES TO:</span>
            {info.goesTo.map((route, i) => (
              <div key={i} style={{marginLeft: "10px"}}>• {route}</div>
            ))}
          </div>
        </>
      ) : (
        <div style={{color: "red"}}>Unknown route</div>
      )}
    </div>
  )
}