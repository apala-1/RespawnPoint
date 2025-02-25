import { lazy, Suspense } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

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
const Forgot = lazy(() => import("./pages/Auth/Forgot"));
const Choose = lazy(() => import("./pages/Extra/ChooseLogin"));
const AdminDashboard = lazy(() => import("./pages/Home/admindashboard"));
const UserDashboard = lazy(() => import("./pages/Home/userdashboard"));
const AdminLogin = lazy(() => import("./pages/Auth/AdminLogin"));
const AddGame = lazy(() => import("./pages/Featured/AddGameForm"));
const GameDetails = lazy(() => import("./pages/Featured/GameDetails"));
const AdminFeatured = lazy(() => import("./pages/Featured/adminfeatured"));

function App() {

  return (
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
            <Route path="/forgot" element = {<Forgot/>}/>
            <Route path="/choose" element = {<Choose/>}/>
            <Route path="/adminlogin" element = {<AdminLogin/>}/>
            <Route path="/addgame" element = {<AddGame/>}/>
            <Route path="/game/:id" element={<GameDetails />} />
            <Route path="/user-dashboard" element = {<UserDashboard/>}/>
            <Route path="/admin-dashboard" element = {<AdminDashboard/>}/>
            <Route path="/adminfeatured" element = {<AdminFeatured/>}/>
          </Routes>
        </Suspense>
      </Router>
  );
}

export default App;
