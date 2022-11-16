import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://nmolqobbjkmzoagorcqn.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tb2xxb2Jiamttem9hZ29yY3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg1MjY1MTIsImV4cCI6MTk4NDEwMjUxMn0.8sRmHQQ-UE17lmXTeNmW4IHJnvUXugngj_nbnHJj7bw";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("videos").select("*");
    },
  };
}
