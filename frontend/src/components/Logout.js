import Axios from "axios";
import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Logout() {
	const { setUser } = useContext(UserContext);
	useEffect(() => {
		const logout = async () => {
			await Axios.get("http://localhost:3000/logout");
			setUser({
				loggedIn: false,
				userInfo: {},
			});
		};
		logout();
	});
	return (
		<Navigate replace to={"/"}>
			Logout
		</Navigate>
	);
}
