import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import * as entitiesActions from "./store/entities";
import Home from "./components/Home";
import Continent from "./components/Continent";

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/:continent">
        <Continent />
      </Route>
    </Router>
  );
}

export default App;
