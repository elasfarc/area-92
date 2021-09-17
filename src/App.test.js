import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/configureStore";

const MockApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

describe("Mission component", () => {
  it("should match the snapshot", () => {
    const tree = renderer.create(<MockApp />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
