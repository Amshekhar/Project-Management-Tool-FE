import { createContext, useContext, useState } from "react";

const UserContext = createContext();


export const UserProvider = ({ children }) => {

    const [getToken, setToken] = useState(sessionStorage.getItem('token'));
    const [getName, setName] = useState(sessionStorage.getItem('name'));
    const [userData, setUserData] = useState(null)

    const onTokenHandler = (data) => {
        // console.log(data);
        setToken(data);
        console.log(getToken);
        sessionStorage.setItem('token', data);
    }

    const onNameHandler = (data) => {
        setName(data);
        sessionStorage.setItem('name', data);
    }

    const getUserDashboard = async () => {
        const token = sessionStorage.getItem("token");
        // console.log(token)
    
        const response = await fetch('http://localhost:8143/getUserDashBoardByToken', {
            method: 'GET',
            headers: {
                "token": `Bearer ${token}`
            }
        });
        // console.log(response);
        const data = await response.json();
        setUserData(data)
    
    }
    const object = {
        getToken,
        getName,
        onTokenHandler,
        onNameHandler,
        userData,
        setUserData,
        getUserDashboard
    }


    return (<div>
        <UserContext.Provider value={object}>
            {children}
        </UserContext.Provider>
    </div>)
}

export function useUser() {
    return useContext(UserContext);
}