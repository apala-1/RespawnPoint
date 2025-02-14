import { lazy, Suspense } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from "./components/PrivateRoute";

const Homepage = lazy(() => import("./pages/Home/homepage"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/SignUp"));
const Featured = lazy(() => import("./pages/Featured/featured"));
const About = lazy(() => import("./pages/About/About"));
const FAQ = lazy(() => import("./pages/FAQ/FAQ"));
const Forum = lazy(() => import("./pages/Forum/Forum"));
const Playthroughs = lazy(() => import("./pages/Playthroughs/Playthroughs"));
const Privacy = lazy(() => import("./pages/Privacy/Privacy"));
const Reviews = lazy(() => import("./pages/Reviews/Reviews"));
const Terms = lazy(() => import("./pages/Terms/Terms"));
const Tutorials = lazy(() => import("./pages/Tutorials/Tutorials"));

function App() {

  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}> 
          <Routes>
            <Route path="/" element =  {<Navigate to={"/homepage"}/>}/>
            <Route path="/homepage" element = {<Homepage/>}/>
            <Route path="/signup" element = {<Signup/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/featured" element = {<Featured/>}/>
            <Route path="/about" element = {<About/>}/>
            <Route path="/faq" element = {<FAQ/>}/>
            <Route path="/forum" element = {<Forum/>}/>
            <Route path="/playthroughs" element = {<Playthroughs/>}/>
            <Route path="/privacy" element = {<Privacy/>}/>
            <Route path="/reviews" element = {<Reviews/>}/>
            <Route path="/terms" element = {<Terms/>}/>
            <Route path="/tutorials" element = {<Tutorials/>}/>
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
