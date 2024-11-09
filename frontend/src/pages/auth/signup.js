import React, { useState } from "react";
import { usePost } from '../../hooks/usePost'

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { postData, loading } = usePost('user')

    const handleSignup = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            postData({name, email, password})
        }
        else {
            console.log("Passwords don't match")
        }
    };

    return (
        <div class="ic-main">
            <div>
                <div class="ic-link">
                    <a href="/login">Have a Univ Account?<br />
                        Click Here to Login</a>
                </div>
                <div class="ic-title">
                    <h2>Sign Up</h2>
                </div>
                <form onSubmit={handleSignup}>
                    <div class="ic-label">Enter name:</div>
                    <div class="ic-input">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div class="ic-label">Enter email:</div>
                    <div class="ic-input">
                        <input
                            type="email"
                            placeholder="student@univ.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div class="ic-label">Enter password:</div>
                    <div class="ic-input">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div class="ic-label">Confirm password:</div>
                    <div class="ic-input">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div class="ic-sign">
                        <button class="ic-button" type="submit">Sign Up</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Signup;