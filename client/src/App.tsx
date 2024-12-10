import Layout from "@/Layout";
import Home from "@/routes/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route
          index
          element={<Home />}
        />
        {/* <Route
          path="login"
          element={<Login />}
        />
        <Route
          path="sign-up"
          element={<SignUp />}
        /> */}

        {/* Protected routes */}
        {/* <Route element={<RequireAuth />}>
          <Route element={<DashLayout />}>
            <Route
              path="dash"
              element={<DashHome />}
            />
            <Route
              path="exercises"
              element={<Exercises />}
            />
          </Route>
        </Route>

        <Route
          path="*"
          element={<NotFound />}
        /> */}
      </Route>
    </Routes>
  );
}

export default App;
