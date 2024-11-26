import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/page/Home/Home";
import { Registration } from "./components/page/Registration/Registration";
import { User } from "./components/page/User/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} /> // トップ画面
        <Route path="/cards/register" Component={Registration} /> //
        新規登録画面
        <Route path="/cards/:id" Component={User} /> // user画面
      </Routes>
    </BrowserRouter>
  );
}

export default App;
