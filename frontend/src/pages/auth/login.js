import React, { useState } from "react";
import { usePost } from "../../hooks/usePost";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const { postData, loading } = usePost('user/login')

    const handleLogin = (e) => {
        e.preventDefault();
        postData({ email, password }, () => navigate('/'))
    };

    return (
        <div class="ic-main">
            <div>
                <div class="ic-link">
                    <a href="/signup">Need a Univ Account?<br />
                        Click Here, It's Free!</a>
                </div>
                <div class="ic-title">
                    <h2>Univ.HUB</h2>
                </div>
                <form onSubmit={handleLogin}>
                    <div class="ic-label">
                        <label>Email:</label>
                    </div>
                    <div class="ic-input">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div class="ic-label">
                        <label>Password:</label>
                    </div>
                    <div class="ic-input">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div class="ic-log">
                        <button class="ic-button" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default Login;