import React, {useState} from "react";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();
        console.log("Signup email:", email, "password", password);
    };

    return (
        <div class="ic-main">
            <div>
                <div class="ic-link">
                    <a href ="/login">Have a Univ Account?<br/>
                    Click Here to Login</a>
                </div>
                <div class="ic-title">
                    <h2>Sign Up</h2>
                </div>
                <form onSubmit={handleSignup}>
                    <div class="ic-label">Enter email:</div>
                    <div class="ic-input">
                        <input 
                            type="email"
                            placeholder="first.last@teach.fac.univ.cc"
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