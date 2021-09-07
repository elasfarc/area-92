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
import Country from "./components/Country";

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/:continent" exact>
        <Continent />
      </Route>
      <Route path="/:continent/:country">
        <Country />
      </Route>
    </Router>
  );
}

export default App;
