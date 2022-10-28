import React, {useEffect, useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from "../contexts/UserContext";
import Axios from "axios";

export default function Logout() {
	const { setUser } = useContext(UserContext);
    useEffect(() => {
        const logout = async() => {
            await Axios.get('http://localhost:3000/logout')
            setUser({
                'loggedIn': false,
                'userInfo': {}
            })
        }
        logout()
      });
    return (
        <Navigate replace to={'/'}>Logout</Navigate>
    )
}
