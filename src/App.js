

import './App.css';
import axios from 'axios';
import React, { useEffect, useState, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from "react-router-dom";
import Spinner from './components/Spinner';
const Home = React.lazy(() => import('./components/Home'));
const NavBar = React.lazy(() => import('./components/NavBar'));
const Form = React.lazy(() => import('./components/Form'));
const Alert = React.lazy(() => import('./components/Alert'));
const AllUsers = React.lazy(() => import('./components/AllUsers'));
const YourData = React.lazy(() => import('./components/YourData'));
const UpdataMyData = React.lazy(() => import('./components/UpdataMyData'));
const About = React.lazy(() => import('./components/About'));

export const Context = React.createContext();

function App() {

  const navigate = useNavigate();

  const [alert, setAlert] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allusers, setAllusers] = useState([]);
  const [noUser, setNoUser] = useState(false);
  const [SearchQuary, setSearchQuary] = useState("");
  const [currentUserData, setCurrentUserData] = useState({});
  const [selectedGender, setSelectedGender] = useState('');
  const [activeLink, setActiveLink] = useState("/")


  let location = useLocation();

  let showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  }

  const handleSubmit = async (event) => {
    setSaving(true);
    event.preventDefault();

    const formData = new FormData(event.target);
    const formdatamain = {};
    for (let pair of formData.entries()) {
      formdatamain[pair[0]] = pair[1];
    }


    try {
      await axios.post('http://localhost:5000/api/user/createuser', formdatamain);
      showAlert("Data has been stored successfully.");
      setSaving(false);
      setTimeout(() => {
        navigate('/')
      }, 2500)

    } catch (error) {
      console.log("Some error ocurred POST request: " + error);
    }
  }

  const getUserDataById = async (id) => {
    setLoading(true);
    try {
      let currentUser = await axios.get(`http://localhost:5000/api/user/getdatabyid/${id}`);

      setCurrentUserData(currentUser.data);
      setLoading(false);
    } catch (error) {
      console.log("Some error ocurred in GET USER BY ID request: " + error);
    }
  }

  const deleteUserById = async (id) => {
    setSaving(true);
    try {
      await axios.delete(`http://localhost:5000/api/user/deleteuser/${id}`);
      setSaving(false);
      showAlert("User has been deleted successfully.");
      setTimeout(() => {
        navigate('/'); // Replace '/' with the desired route
      }, 2500);
    } catch (error) {
      console.log("Some error ocurred in GET USER BY ID request: " + error);
    }
  }


  const handleUpdate = async (formdatamain, id) => {
    setSaving(true);
    try {
      await axios.put(`http://localhost:5000/api/user/updateuser/${id}`, formdatamain);
      showAlert("Data has been Updated successfully.");
      setTimeout(() => {
        navigate('/')
      }, 2500)
      setSaving(false);
    } catch (error) {
      console.log("Some error ocurred during UPDATE request: " + error);
    }
  }


  let handleSearch = async () => {
    setNoUser(false);
    setLoading(true);
    if (activeLink === '/allusers') {
      document.querySelector("#con").style.display = "block";
    }
    else {
      document.querySelector("#con").style.display = "none";
    }

    console.log("This is in handle search : '" + SearchQuary + "'");

    try {
      let response = await axios({
        method: 'GET',
        url: 'http://localhost:5000/api/user/search',
        params: { fullName: SearchQuary, gender: selectedGender },
      })

      setAllusers(response.data.results);

      if ((response.data.results.length === 0)) {
        console.log("zero");
        setNoUser(true);
      }

      setLoading(false);

      document.querySelector("#con").style.display = "none";

    } catch (error) {
      console.log("Some error occurred during the GET request: " + error);
    }
  }


  useEffect(() => {
    const rootPath = location.pathname;
    setActiveLink(rootPath);
  }, [location]);

  return (
    <Context.Provider value={{ setSearchQuary, setSelectedGender, activeLink, setActiveLink, saving, handleSubmit, allusers, noUser, getUserDataById, loading, currentUserData, handleUpdate, deleteUserById, SearchQuary, selectedGender, handleSearch, setAllusers }}>
      {alert && <Alert alert={alert} />}

      <Suspense fallback={<Spinner />}>
        <NavBar />

        <Routes>
          <Route path='/newUserData' element={<Form />} />
          <Route path='/' element={<Home />} />
          <Route path='/allusers' element={<AllUsers />} />
          <Route path='/updateuser' element={<UpdataMyData />} />
          <Route path='/about' element={<About />} />
          <Route path='/yourdata' element={<YourData />} />
        </Routes>
      </Suspense>

      {activeLink === "/allusers" && <Spinner />}
    </Context.Provider>
  );
}

const RootComponent = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};


export default RootComponent;

// setCount