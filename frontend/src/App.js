import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Signup from "./components/signup/Signup";
import About from "./components/About";
import Dashboard from "./components/reviewer_pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import {useState} from 'react';

function App() {
	const [user, setUser] = useState({
		'loggedIn': false,
		'userInfo': {}
	})
	return (
		<div>
			<UserContext.Provider value={{user, setUser}}>
				<NavBar />
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/about" element={<About />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</UserContext.Provider>
		</div>
	);
}

export default App;
