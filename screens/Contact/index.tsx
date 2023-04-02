import { useSession } from "next-auth/react";
import React from "react";
import ContactWrapper from "./styles";

const Contact = () => {
    const { data: session, status } = useSession()
    console.log("Auth ", session);
    console.log("Status ", status);
    
    return <ContactWrapper>
        <h1>Contact</h1>
        <h3>This is protected screen</h3>
    </ContactWrapper>
}

export default Contact