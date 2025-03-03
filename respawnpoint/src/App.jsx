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
const CreateGame = lazy(() => import("./pages/Home/CreateGame"));
const UpdateGame = lazy(() => import("./pages/Home/UpdateGame"));
const DeleteGame = lazy(() => import("./pages/Home/DeleteGame"));
const GameDetails = lazy(() => import("./pages/Featured/GameDetails"));
const Profile = lazy(() => import("./pages/Home/Profile"));
const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword"));
const CreateTutorial = lazy(() => import("./pages/Tutorials/CreateTutorial"));
const TutorialDetail = lazy(() => import("./pages/Tutorials/TutorialDetail"));
const UpdateTutorial = lazy(() => import("./pages/Tutorials/UpdateTutorial"));
const ForumDetails = lazy(() => import("./pages/Forum/ForumDetails"));
const ReviewDetails = lazy(() => import("./pages/Reviews/ReviewDetails"));
const PlaythroughDetails = lazy(() => import("./pages/Playthroughs/PlaythroughDetails"));

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
            <Route path="/user-dashboard" element = {<UserDashboard/>}/>
            <Route path="/admin-dashboard" element = {<AdminDashboard/>}/>
            <Route path="create-game" element = {<CreateGame/>}/>
            <Route path="update-game/:gameId" element = {<UpdateGame/>}/>
            <Route path="delete-game/:gameId" element = {<DeleteGame/>}/>
            <Route path="/game/:id" element={<GameDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/create-tutorial" element={<CreateTutorial/>} />
            <Route path="/tutorials/:id" element={<TutorialDetail/>} />
            <Route path="/tutorials/update/:id" element={<UpdateTutorial/>} />
            <Route path="/forum/:gameId" element={<ForumDetails />} />
            <Route path="/review/:gameId" element={<ReviewDetails />} />
            <Route path="/playthrough/:gameId" element={<PlaythroughDetails />} />
          </Routes>
        </Suspense>
      </Router>
  );
}

export default App;
