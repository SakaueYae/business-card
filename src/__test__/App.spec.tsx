import App from "../App";
import { render, screen } from "@testing-library/react";
import { Provider } from "../components/ui/provider";
import {
  BrowserRouter,
  createMemoryRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { Home } from "../components/page/Home/Home";
import { User } from "../components/page/User/User";
import userEvent from "@testing-library/user-event";

// const router = createMemoryRouter(
//   [
//     {
//       path: "/",
//       element: <Home />,
//     },
//     {
//       path: "/cards/register",
//       element: <Registration />,
//     },
//     {
//       path: "/cards/:id",
//       element: <User />,
//     },
//   ],
//   {
//     initialEntries: ["/"],
//   }
// );

jest.mock("../components/page/Home/models/login", () => {
  return {
    login: jest.fn().mockResolvedValue({
      id: false,
      server: false,
    }),
  };
});

describe("App", () => {
  test("Appのレンダリング", () => {
    render(
      <Provider>
        <App />
      </Provider>
    );
    screen.debug();
  });

  test("Homeのレンダリング", () => {
    render(
      <Provider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
  });

  test("Userのレンダリング", () => {
    render(
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={User} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  });
});

describe("Homeのテスト", () => {
  const renderHome = () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Home />,
        },
      ],
      {
        initialEntries: ["/"],
      }
    );
    render(
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    );
    return router;
  };

  test("タイトルが表示されている", () => {
    renderHome();
    const title = screen.getByRole("heading");
    expect(title).toBeDefined();
  });

  test("IDを入力してボタンを押すと/cards/:idに遷移する", async () => {
    const router = renderHome();
    const user = userEvent.setup();
    await user.type(screen.getByRole("textbox"), "sample_id");
    await user.click(screen.getByRole("button"));
    expect(router.state.location.pathname).toEqual("/cards/sample_id");
  });

  test("IDを入力しないでボタンを押すとエラーメッセージが表示される", async () => {
    renderHome();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("IDを入力してください")).toBeDefined();
  });

  test("新規登録はこちらを押すと/cards/registerに遷移する", async () => {
    const router = renderHome();
    const user = userEvent.setup();
    await user.click(screen.getByText("新規登録はこちら")); // getByRole("link")はhrefがついているやつ
    expect(router.state.location.pathname).toEqual("/cards/register");
  });
});
