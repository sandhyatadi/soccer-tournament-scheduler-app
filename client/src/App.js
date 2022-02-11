import './App.css';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import FAQ from './components/FAQ';
import Login from './components/login/Login.js';
import Home from './pages/Home';
import { Route, BrowserRouter as Router } from "react-router-dom";
import Ticket from './pages/Ticket';
import Matches from './pages/Matches';
import Signup from './components/signup/Signup';
import Replays from './pages/ReplayPage';
import TeamCreationForm from './components/Coach/TeamCreationForm';
import Coach from './components/Coach';
import Adminpage from './pages/Adminpage';
import Volunteer from './pages/Volunteer';
import Referee from './components/Referee';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/faq" exact component={FAQ}></Route>
        <Route path="/contactus" exact component={ContactUs}></Route>
        <Route path="/aboutus" exact component={AboutUs}></Route>
        <Route path = "/ticket" exact component={Ticket}></Route>
        <Route path = "/matches" exact component={Matches}></Route>
        <Route path = "/signup" exact component = {Signup}></Route>
        <Route path = "/replays" exact component = {Replays}></Route>
        <Route path = '/coach' exact component = {Coach}></Route>
        <Route path = "/admin" exact component = {Adminpage}></Route>
        <Route path = "/managevolunteer" exact component = {Volunteer}></Route>
        <Route path = "/refereedetails" exact component = {Referee}></Route>
        <Route path = "/search" exact component = {Search}></Route>
      </switch>
    </Router>
  );
}

export default App;
