import React, {useEffect, useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from "../contexts/UserContext";

export default function Logout() {
	const { user, setUser } = useContext(UserContext);
    useEffect(() => {
        setUser({
            'loggedIn': false,
            'userInfo': {}
        })
      });
    return (
        <Navigate replace to={'/'}>Logout</Navigate>
    )
}
