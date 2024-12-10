import { Route, Routes } from 'react-router-dom';

import Layout from '@/Layout';
import Home from '@/routes/Home';
import Messages from '@/routes/Messages';
import MessagesLayout from '@/routes/MessagesLayout';
import NotFound from '@/routes/NotFound';
import RequireAuthLayout from '@/routes/RequireAuthLayout';

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
        <Route element={<RequireAuthLayout />}>
          <Route element={<MessagesLayout />}>
            <Route
              path="messages"
              element={<Messages />}
            />
          </Route>
        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
}

export default App;
