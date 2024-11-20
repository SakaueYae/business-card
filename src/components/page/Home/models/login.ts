import { supabase } from "../../../../utils/supabase";

export const login = async (id: string) => {
  const { data } = await supabase.from("users").select("*").eq("user_id", id);
  if (!data)
    return {
      id: false,
      server: true,
    };
  return {
    id: data.length === 0,
    server: false,
  };
};
