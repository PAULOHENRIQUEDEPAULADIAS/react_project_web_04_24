import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.scss';

import SignIn from './view/signin.tsx';
import SignUp from './view/signup.tsx';
import Home from './view/home.tsx';
import Settings from './view/settigns.tsx';
import Forms from './view/forms.tsx';
import PrivateRoute from "./components/privateroute.tsx";
import { AuthProvider, useAuth } from "./services/authcontext.jsx";


function App() {
  const { isAuthenticated } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Home />} />}
          />
          <Route
            path="/settings"
            element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Settings />} />}
          />
          <Route
            path="/forms"
            element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Forms />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;