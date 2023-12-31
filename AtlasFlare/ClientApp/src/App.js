import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Menu from './components/Routes/Menu'
import Home from './components/Routes/Home';
import Login from './components/Routes/Login';
import Register from './components/Routes/Register';
import Quiz from './components/Routes/Quiz';
import Navbar from './components/Navbar';
import UserPage from './components/Routes/UserPage';
import NotFound from "./components/Routes/NotFound";
import Result from "./components/Routes/Result";
import './custom.css';
import './styles/Home.css';
import "../src/styles/Home.css";
import "../src/styles/Register.css"
import "../src/styles/Navbar.css";
import "../src/styles/UserPage.css";
import "../src/styles/Result.css";


function App() {
    const [signedIn, setSignedIn] = useState(false);
    const [username, setUsername] = useState("");

        
    useEffect(() => {
        if (sessionStorage.getItem("signedInUser")) {
            setSignedIn(true);
            setUsername(sessionStorage.getItem("signedInUser"));
        }
    }, [signedIn]);


    function changeSignedIn() {
        setSignedIn(!signedIn);
    }

    return (
        <div>
            <Navbar changeSignedIn={changeSignedIn} signedIn={signedIn} username={username} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu username={username} />} />          
                <Route path="/login" element={<Login changeSignedIn={changeSignedIn} />} />
                <Route path="/register" element={<Register /> } />
                <Route path="/quiz/:continent" element={<Quiz username={username} />} />
                <Route path="/user/:name" element={<UserPage />} />
                <Route path="/result" element={<Result username={username} /> } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}
export default App;

