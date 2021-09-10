import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import Home from "../components/Home";
import store from "../store/configureStore";

const MockHome = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

describe("Mission component", () => {
  it("should match the snapshot", () => {
    const tree = renderer.create(<MockHome />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
