import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import Navbar from "../components/Navbar";
import store from "../store/configureStore";

const MockNav = () => (
  <Provider store={store}>
    <Navbar />
  </Provider>
);

describe("Mission component", () => {
  it("should match the snapshot", () => {
    const tree = renderer.create(<MockNav />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
