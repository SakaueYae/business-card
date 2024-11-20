import { supabase } from "../../../../utils/supabase";

export const getSkills = async () => {
  const { data } = await supabase.from("skills").select("*");
  const skills = data?.map(({ id, name }) => ({
    id,
    label: name,
  }));
  return skills;
};
