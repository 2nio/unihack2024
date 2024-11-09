import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            Alert.alert('Login', `Logging in with Email: ${email}`);
          } else {
            Alert.alert('Error', 'Please fill in both fields');
          }
        //
    };

    return (
        <div class="ic-main">
            <div>
                <div class="ic-link">
                    <a href ="/signup">Need a Univ Account?<br/>
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