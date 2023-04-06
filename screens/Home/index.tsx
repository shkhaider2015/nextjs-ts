import React from "react";
import HomeWrapper from "./styles";
import { useAuth } from "../../hooks";

const HomeComp = () => {
    const isAuthenticated = useAuth();

    if(!isAuthenticated)
    {
        return <div></div>
    }
    return <HomeWrapper>
        <h1>Home</h1>
    </HomeWrapper>
}

export default HomeComp