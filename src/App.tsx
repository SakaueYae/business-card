import { supabase } from "./utils/supabase";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/page/Home/Home";
import { Registration } from "./components/page/Registration/Registration";
import { User } from "./components/page/User/User";

function App() {
  const getData = async () => {
    try {
      const res = await supabase.from("users").select("*");
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  getData();

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
