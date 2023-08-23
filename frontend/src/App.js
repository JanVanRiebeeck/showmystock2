// src app.js -->
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import Marketplace from "./pages/marketplace";
import UserFeed from "./pages/userFeed";
import Settings from "./pages/settings";

import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/marketplace" element={<Marketplace />} exact />
        <Route path="/user/:username" element={<UserFeed />} exact />

        {/* Logged-In Routes */}
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} exact />{" "}
          <Route path="/settings" element={<Settings />} exact />{" "}
          {/* Private Profile */}
          <Route path="/" element={<Home />} exact />
          {/*<Route path="/create-ad" element={<CreateAd />} exact />{" "}*/}
          {/* Example CRUD operation */}
        </Route>

        {/* Not Logged-In Routes */}
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
          <Route
            path="/user/:username/profile"
            element={<Profile />}
            exact
          />{" "}
          {/* Public Profile */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
