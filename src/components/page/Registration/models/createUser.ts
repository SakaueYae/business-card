import { RegistrationForm } from "../Type";
import { supabase } from "../../../../utils/supabase";

export const createUser = async (value: RegistrationForm) => {
  const { status: userStatus } = await supabase.from("users").insert([
    {
      user_id: value.user_id,
      name: value.name,
      description: value.description,
      github_id: value.github_id,
      qiita_id: value.qiita_id,
      x_id: value.x_id,
    },
  ]);
  const { status: skillStatus } = await supabase.from("user_skill").insert([
    {
      skill_id: Number(value.skill_id[0]),
      user_id: value.user_id,
    },
  ]);

  return userStatus === 201 && skillStatus === 201;
};
