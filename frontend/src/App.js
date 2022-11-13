import About from "./components/About";
import { default as DashboardAdmin } from "./components/admin_pages/Dashboard";
import LoginAdmin from "./components/admin_pages/Login";
import Paper from "./components/admin_pages/Paper";
import Reviewers from "./components/admin_pages/Reviewers";
import Homepage from "./components/Homepage";
import Account from "./components/journal_pages/Account";
import { default as DashboardJournal } from "./components/journal_pages/Dashboard";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NavBar from "./components/NavBar";
import { default as DashboardReviewer } from "./components/reviewer_pages/Dashboard";
import Signup from "./components/signup/Signup";

import ProtectedRoutesAdmin from "./components/protected_routes/ProtectedRoutesAdmin";
import ProtectedRoutesJournal from "./components/protected_routes/ProtectedRoutesJournal";
import ProtectedRoutesReviewer from "./components/protected_routes/ProtectedRoutesReviewer";

import Axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

function App() {
	const [user, setUser] = useState({
		loggedIn: false,
		userInfo: {},
		userRole: null,
	});

	Axios.defaults.withCredentials = true;
	useEffect(() => {
		const loggedIn = async () => {
			const res = await Axios.get("http://localhost:3000/login");
			if (res.data.loggedIn === true) {
				console.log(res.data);
				setUser(res.data);
			}
		};
		loggedIn();
	}, []);

	return (
		<div className="vh-100">
			<UserContext.Provider value={{ user, setUser }}>
				<NavBar />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/loginAdmin" element={<LoginAdmin />} />
					<Route path="/about" element={<About />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/account" element={<Account />} />
					<Route path="/paper" element={<Paper paperID="1" />} />
					<Route element={<ProtectedRoutesAdmin />}>
						<Route path="/reviewers" element={<Reviewers />} />
						<Route
							path="/dashboardAdmin"
							element={<DashboardAdmin />}
						/>
					</Route>
					<Route element={<ProtectedRoutesJournal />}>
						<Route
							path="dashboardJournal"
							element={<DashboardJournal />}
						/>
					</Route>
					<Route element={<ProtectedRoutesReviewer />}>
						<Route
							path="dashboardReviewer"
							element={<DashboardReviewer />}
						/>
					</Route>
					<Route path="/logout" element={<Logout />} />
				</Routes>
			</UserContext.Provider>
		</div>
	);
}

export default App;
