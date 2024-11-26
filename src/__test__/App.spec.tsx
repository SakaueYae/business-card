import App from "../App";
import { render, screen } from "@testing-library/react";
import { Provider } from "../components/ui/provider";

describe("App", () => {
  test("Appのレンダリング", () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    screen.debug();
  });
});
