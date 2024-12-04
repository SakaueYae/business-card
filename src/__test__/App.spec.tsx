import App from "../App";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Provider } from "../components/ui/provider";
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from "../components/page/Home/Home";
import userEvent from "@testing-library/user-event";

jest.mock("../components/page/Home/models/login", () => {
  return {
    login: jest.fn().mockResolvedValue({
      id: false,
      server: false,
    }),
  };
});

jest.mock("../components/page/User/models/getUser", () => {
  return {
    getUser: jest.fn().mockResolvedValue({
      description: "<h1>自己紹介</h1><div>私は<b>田中太郎</b>です！</div>",
      github_id: "taro_github",
      name: "田中太郎",
      qiita_id: "taro_qiita",
      user_id: "taro",
      x_id: "taro_x",
      skill_id: ["React"],
    }),
  };
});

const renderApp = (initial: string) => {
  render(
    <Provider>
      <MemoryRouter initialEntries={[initial]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
};

describe("User", () => {
  beforeEach(async () => {
    renderApp("/cards/sample-id");
    const loading = screen.getByText("Loading...");
    await waitForElementToBeRemoved(loading);
  });

  test("名前が表示されている", () => {
    waitFor(async () => {
      const title = await screen.getByText("田中太郎");
      expect(title).toBeDefined();
    });
  });

  test("自己紹介が表示されている", () => {
    waitFor(async () => {
      const description = await screen.getByText("自己紹介");
      expect(description).toBeDefined();
    });
  });

  test("技術が表示されている", () => {
    const skills = screen.getByText("React");
    expect(skills).toBeDefined();
  });

  test("Githubアイコンが表示されている", () => {
    const githubIcon = screen.getByTestId("github-icon");
    expect(githubIcon).toBeDefined();
  });

  test("Qiitaのアイコンが表示されている", () => {
    const qiitaIcon = screen.getByTestId("qiita-icon");
    expect(qiitaIcon).toBeDefined();
  });

  test("Twitterのアイコンが表示されている", () => {
    const xIcon = screen.getByTestId("x-icon");
    expect(xIcon).toBeDefined();
  });

  test("戻るボタンをクリックすると/に遷移する", async () => {
    const user = userEvent.setup();
    const returnButton = screen.getByRole("button");
    await user.click(returnButton);
    expect(
      screen.getByRole("heading", { name: "デジタル名刺アプリ" })
    ).toBeDefined();
  });
});

jest.mock("../components/page/Registration/models/getSkills", () => {
  return {
    getSkills: jest.fn().mockResolvedValue([
      {
        id: 1,
        label: "React",
      },
      {
        id: 2,
        label: "TypeScript",
      },
      {
        id: 3,
        label: "Python",
      },
    ]),
  };
});

jest.mock("../components/page/Registration/models/createUser", () => ({
  createUser: jest.fn().mockResolvedValue(true),
}));

describe("Registration", () => {
  beforeEach(async () => {
    renderApp("/cards/register");
  });

  test("タイトルが表示されている", () => {
    const title = screen.getByRole("heading");
    expect(title).toBeDefined();
  });

  test("全項目入力して登録ボタンを押すと/に遷移する", async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole("textbox", { name: "ID" }), "hanako");
    await user.type(screen.getByRole("textbox", { name: "名前" }), "高橋花子");
    await user.type(
      screen.getByRole("textbox", { name: "自己紹介" }),
      "<div>これは私の自己紹介です。</div>"
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "好きな技術" }),
      "TypeScript"
    );

    await user.type(
      screen.getByRole("textbox", { name: "GitHub ID" }),
      "hanako_github"
    );
    await user.type(
      screen.getByRole("textbox", { name: "Qiita ID" }),
      "hanako_qiita"
    );
    await user.type(screen.getByRole("textbox", { name: "X ID" }), "hanako_x");

    await user.click(screen.getByRole("button", { name: "新規登録" }));
    expect(
      screen.getByRole("heading", { name: "デジタル名刺アプリ" })
    ).toBeDefined();
  });

  test("IDがないときにエラーメッセージがでる", async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole("textbox", { name: "名前" }), "高橋花子");
    await user.type(
      screen.getByRole("textbox", { name: "自己紹介" }),
      "<div>これは私の自己紹介です。</div>"
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: "好きな技術" }),
      "TypeScript"
    );
    await user.click(screen.getByRole("button", { name: "新規登録" }));
    screen.debug();
    expect(
      screen.queryByRole("alert", { name: "IDを入力してください" }) // getBy not equal queryBy
    ).toBeDefined();
  });

  test("名前がないときにエラーメッセージがでる", async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole("textbox", { name: "ID" }), "hanako");
    await user.type(
      screen.getByRole("textbox", { name: "自己紹介" }),
      "<div>これは私の自己紹介です。</div>"
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: "好きな技術" }),
      "TypeScript"
    );
    await user.click(screen.getByRole("button", { name: "新規登録" }));
    screen.debug();
    expect(
      screen.queryByRole("alert", { name: "名前を入力してください" })
    ).toBeDefined();
  });

  test("紹介文がないときにエラーメッセージがでる", async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole("textbox", { name: "ID" }), "hanako");
    await user.type(screen.getByRole("textbox", { name: "名前" }), "高橋花子");
    await user.selectOptions(
      screen.getByRole("combobox", { name: "好きな技術" }),
      "TypeScript"
    );
    await user.click(screen.getByRole("button", { name: "新規登録" }));
    screen.debug();
    expect(
      screen.queryByRole("alert", { name: "自己紹介を入力してください" })
    ).toBeDefined();
  });

  test("オプションを入力しなくても登録ができる", async () => {
    const user = userEvent.setup();
    await user.type(screen.getByRole("textbox", { name: "ID" }), "hanako");
    await user.type(screen.getByRole("textbox", { name: "名前" }), "高橋花子");
    await user.type(
      screen.getByRole("textbox", { name: "自己紹介" }),
      "<div>これは私の自己紹介です。</div>"
    );
    await user.selectOptions(
      screen.getByRole("combobox", { name: "好きな技術" }),
      "TypeScript"
    );
    await user.click(screen.getByRole("button", { name: "新規登録" }));
    screen.debug();
    expect(
      screen.getByRole("heading", { name: "デジタル名刺アプリ" })
    ).toBeDefined();
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
