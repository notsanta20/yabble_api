const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseURL, supabaseKey);

async function uploadFile(file, userId) {
  const { data, error } = await supabase.storage
    .from("yabble")
    .upload("./userId/", file);

  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}
