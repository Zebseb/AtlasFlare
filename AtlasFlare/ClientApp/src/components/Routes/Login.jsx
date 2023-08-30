import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { redirect } from '../../../../../../../../node_modules/react-router/dist/index';

function Login() {

    const [student, setStudent] = useState({
        Username: '',
        Password: '',
    });

    function handleUsername(e) {
        setStudent({ ...student, Username: e.target.value });
    }

    function handlePassword(e) {
        setStudent({ ...student, Password: e.target.value });
    }

    function handleLogin() {
        console.log("Username:", student.Username);
        console.log("Password:", student.Password);
        const username = student.Username;
        const password = student.Password;

        const url = `user?username=${username}&password=${password}`;

        try {
            fetch(url).then(response => {
                if (response.ok) {
                    //Ok login
                    //ta användaren till quiz sidan
                    console.log("Successful login");
                }
                else {
                    //Error login
                }
            })
        }
        catch (error) {

        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin();
    }


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input id="name-input" placeholder='Username' onChange={handleUsername} type="text" value={student.Username}></input>
                <input id="password-input" placeholder='Password' onChange={handlePassword} type="password" value={student.Password}></input>

                <button type="submit">Login</button>
            </form>
            <Link to={"/Register"}>Don't have an account? Register!</Link>
        </div>
    );
}

export default Login;