import { useSession } from "next-auth/react";
import React from "react";
import ContactWrapper from "./styles";
import { useAuth } from "../../hooks";

const Contact = () => {
    const { data: session, status } = useSession()
    const isAuthenticated = useAuth();
    console.log("Auth ", session);
    console.log("Status ", status);
    console.log("IsAuthenticated : ", isAuthenticated)
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset();
    console.log("Time front : ", timezoneOffset);
    
    return <ContactWrapper>
        <h1>Contact</h1>
        <h3>This is protected screen</h3>
    </ContactWrapper>
}

export default Contact