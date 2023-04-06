import React from "react";
import AboutWrapper from "./styles";
import { useAuth } from "../../hooks";

const About = () => {
    const isAuthenticated = useAuth();

    if(!isAuthenticated)
    {
        return <div></div>
    }

    return <AboutWrapper>
        <h1>About</h1>
    </AboutWrapper>
}

export default About