import { useSession } from "next-auth/react";
import React from "react";
import ContactWrapper from "./styles";
import { useAuth } from "../../hooks";

const Contact = () => {
    const isAuthenticated = useAuth();

    if(!isAuthenticated)
    {
        return <div></div>
    }
    
    return <ContactWrapper>
        <h1>Contact</h1>
        <h3>This is protected screen</h3>
    </ContactWrapper>
}

export default Contact