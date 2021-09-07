import "./App.css";

import * as entitiesActions from "./store/entities";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <Router path="/" exact>
      <Home />
    </Router>
  );
}

export default App;
