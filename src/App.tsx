import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Boards from "./pages/Boards";

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
				<Routes>
					<Route path={"/"} element={<Boards />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
