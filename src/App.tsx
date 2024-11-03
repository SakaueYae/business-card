import { Button } from "./components/ui/button";
import { supabase } from "./utils/supabase";

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
    <div>
      <Button>Click me</Button>
    </div>
  );
}

export default App;
