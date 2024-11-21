import { supabase } from "../../../../utils/supabase";
import { RegistrationForm } from "../../Registration/Type";

export const getUser = async (id: string): Promise<RegistrationForm | null> => {
  // ユーザーデータ取得
  const { data } = await supabase.from("users").select("*").eq("user_id", id);
  if (!data || data?.length !== 1) return null;
  const userData = data[0];

  // ユーザーのスキルID取得後,skillsテーブルからラベルを取得
  const { data: skillId } = await supabase
    .from("user_skill")
    .select("skill_id")
    .eq("user_id", userData.user_id);
  if (!skillId) return null;
  const { data: skillName } = await supabase
    .from("skills")
    .select("name")
    .eq("id", skillId[0].skill_id); // 登録時に1つしかスキルを選択できないので,これで問題ないはず
  if (!skillName) return null;

  return { ...userData, skill_id: skillName.map(({ name }) => name) };
};
