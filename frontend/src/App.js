import About from "./components/About";
import { default as DashboardAdmin } from "./components/admin_pages/Dashboard";
import LoginAdmin from "./components/admin_pages/Login";
import { default as PaperAdmin } from "./components/admin_pages/Paper";
import Reviewers from "./components/admin_pages/Reviewers";
import Homepage from "./components/Homepage";
import Account from "./components/journal_pages/Account";
import { default as DashboardJournal } from "./components/journal_pages/Dashboard";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NavBar from "./components/NavBar";
import { default as DashboardReviewer } from "./components/reviewer_pages/Dashboard";
import { default as PaperReviewer } from "./components/reviewer_pages/Paper";
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
	const [loading, setLoading] = useState(true);

	Axios.defaults.withCredentials = true;
	useEffect(() => {
		const loggedIn = async () => {
			const res = await Axios.get(
				"https://olad-backend.herokuapp.com/login"
			);
			if (res.data.loggedIn === true) {
				console.log(res.data);
				setUser(res.data);
			} else {
				console.log("not logged in");
			}
			setLoading(false);
		};
		loggedIn();
	}, []);

	return (
		<div className="vh-100">
			<UserContext.Provider value={{ user, setUser }}>
				<NavBar />
				{loading === false && (
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/loginAdmin" element={<LoginAdmin />} />
						<Route path="/about" element={<About />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/account" element={<Account />} />
						<Route element={<ProtectedRoutesAdmin />}>
							<Route
								path="/dashboardAdmin"
								element={<DashboardAdmin />}
							/>
							<Route
								path="/paperAdmin/:paperID"
								element={<PaperAdmin />}
							/>
							<Route path="/reviewers" element={<Reviewers />} />
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
							<Route
								path="/paperReviewer/:paperID"
								element={<PaperReviewer />}
							/>
						</Route>
						<Route path="/logout" element={<Logout />} />
					</Routes>
				)}
				{loading === true && <div>loading</div>}
			</UserContext.Provider>
		</div>
	);
}

export default App;
