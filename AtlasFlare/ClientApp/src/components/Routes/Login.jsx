import { useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/LogIn.css";

function Login(props) {
    const [student, setStudent] = useState({
        Username: '',
        Password: '',
    });
    const navigate = useNavigate();
    const [message, setMessage] = useState();

    function handleUsername(e) {
        setStudent({ ...student, Username: e.target.value });
    }

    function handlePassword(e) {
        setStudent({ ...student, Password: e.target.value });
    }

    function handleLogin() {
        const username = student.Username;
        const password = student.Password;

        const url = `user/${username}?password=${password}`;

        if (student.Username.trim() !== '' && student.Password.trim() !== '') {
            try {
                fetch(url).then(response => {
                    if (response.ok) {
                        // set session storage
                        sessionStorage.setItem("signedInUser", username);
                        props.changeSignedIn();
                        navigate("/menu");
                    }
                    else {
                        // Error login
                        setMessage("Username or password is incorrect.");
                    }
                })
            }
            catch (error) {
                setMessage("Something went wrong, please try again.");
            }
        }
        else {
            setMessage("Please enter all required fields.");
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin();
    }

    return (
        <div>
            <div className="reglog-content">
                <div className="card-login">
                    <div className="form-container">
                        <div className="successmessage-div success-register"></div>
                        <form onSubmit={handleSubmit}>
                            <label>USERNAME</label>
                            <input id="name-input" placeholder='Username' onChange={handleUsername} type="text" value={student.Username}></input>
                            <div className="message-div warning-register">
                            </div>
                            <label>PASSWORD</label>
                            <input id="password-input" placeholder='Password' onChange={handlePassword} type="password" value={student.Password}></input>
                            <div className="message-div warning-register">
                                {message}
                            </div>
                            <div className="message-div warning-register">
                            </div>
                            <button id="login-btn" type="submit">Log in</button>
                        </form>
                        <div className="link-container">
                            <Link id="reg-link" to={"/Register"}>
                                Don't have an account? Register!
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;