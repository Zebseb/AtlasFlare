﻿import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "../../styles/Register.css";

function Register() {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        defaultValues: {
            userName: "",
            password: "",
        },
        mode: "onBlur"
    });
    const [successMessage, setSuccessMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");
    const navigate = useNavigate();

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async function onSubmit() {
        setConfirmPasswordMessage("");

        if (getValues("password").trim() === confirmPassword.trim()) {
            setErrorMessage("");
            const student = { Username: getValues("userName"), Password: getValues("password") };

            const response = await fetch("user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student),
            });

            if (response.ok) {
                //Show success message
                setSuccessMessage("Welcome to the Atlas Flare family!");
                delay(2000).then(() => navigate("/login"));
            }

            else {
                //Show error message
                setErrorMessage("Username is already in use...");
            }
        }
        else {
            setConfirmPasswordMessage("Passwords does not match!");
        }
    }

    function onError() {
        console.log("Input could not be submitted, please try again.")
    }

    function handleConfirmPassword(e) {
        setConfirmPassword(e.target.value);
    }

    return (
        <div className="reglog-content">
            <div className="register-container">
                <div className="input-display">
                    <div className="successmessage-div success-register">{successMessage}</div>
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                        <label htmlFor="name-input">USERNAME</label>
                        <input id="name-input" type="text" name="userName" placeholder="Username"
                            {...register("userName", {required: "You must specify a username.",
                                minLength: { value: 3, message: "Username needs to be minimum 3 characters." }, pattern: {
                                    value: /[A-Za-z]/,
                                    message: "Username can only contain letters."
                                }
                            })}>
                        </input>
                        <div className="message-div warning-register">
                            {errors.userName?.message}
                        </div>
                        <label htmlFor="password-input">PASSWORD</label>
                        <input id="password-input" type="password" name="password" placeholder="Password"
                            {...register("password", {required: "You must specify a password.",
                                minLength: { value: 5, message: "Password needs to be minimum 5 characters." }
                            })}>
                        </input>
                        <div className="message-div warning-register">
                            {errors.password?.message}
                        </div>
                        <label htmlFor="confirm-password">CONFIRM PASSWORD</label>
                        <input id="confirm-password" type="password" placeholder="Confirm password" onChange={handleConfirmPassword} value={confirmPassword}></input>
                        <div className="message-div warning-register">
                            {confirmPasswordMessage}
                        </div>
                        <div className="message-div warning-register">
                            {errorMessage}
                        </div>
                        <button id="enter-btn" type="submit">REGISTER</button>
                    </form>
                    <div className="link-container">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;