import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import BoardPage from "./pages/BoardPage";
import Boards from "./pages/Boards";

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
				<Routes>
					<Route path={"/"} element={<Boards />} />
					<Route path={`/board/:id`} element={<BoardPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
