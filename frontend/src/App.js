// src app.js -->
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import Marketplace from "./pages/marketplace";
import UserFeed from "./pages/userFeed";
import Settings from "./pages/settings";
import { useSelector } from "react-redux";

import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Activate from "./pages/home/activate";
import ForgotPassword from "./pages/forgotPassword";
import CreatePostPopup from "./components/createPostPopup";

function App() {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div>
      <CreatePostPopup user={user} />
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
          {/* Activate Account for logged in user */}
          <Route path="/activate/:token" element={<Activate />} exact />
          {/*<Route path="/create-ad" element={<CreateAd />} exact />{" "}*/}
          {/* Example CRUD operation */}
        </Route>

        {/* Not Logged-In Routes */}
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
          <Route path="/forgotpassword" element={<ForgotPassword />} exact />
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
