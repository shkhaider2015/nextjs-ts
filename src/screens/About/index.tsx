import React from "react";
import AboutWrapper from "./styles";
import { useAuth } from "../../hooks";

const About = () => {
    let isAuthenticated = useAuth();
    return <AboutWrapper>
        <h1>About</h1>
        <h3>This is protected screen</h3>
    </AboutWrapper>
}

export default About