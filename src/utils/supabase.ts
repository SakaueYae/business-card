import { createClient } from "@supabase/supabase-js";
import {Database} from "../../database.types"

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient<Database>(supabaseUrl!, supabaseKey!);
