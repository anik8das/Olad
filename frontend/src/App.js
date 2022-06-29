import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Signup from "./components/SIgnup";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div>
			<NavBar />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</div>
	);
}

export default App;
