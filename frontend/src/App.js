import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/signup/Signup";
import About from "./components/About";
import Dashboard from "./components/journal_pages/Dashboard";
import Account from "./components/journal_pages/Account";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
	const [user, setUser] = useState({
		loggedIn: false,
		userInfo: {},
	});

	Axios.defaults.withCredentials = true;
	useEffect(() => {
		const loggedIn = async () => {
			const res = await Axios.get("http://localhost:3000/login");
			if (res.data.loggedIn === true) {
				setUser(res.data)
			}
		};
		loggedIn();
	}, []);

	return (
		<div className="vh-100">
			<UserContext.Provider value={{ user, setUser }}>
				<NavBar />
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<Homepage />} />
					<Route path="/about" element={<About />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/account" element={<Account />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/logout" element={<Logout />} />
				</Routes>
			</UserContext.Provider>
		</div>
	);
}

export default App;
