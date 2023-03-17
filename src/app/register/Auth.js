"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { ThemeSupa, Auth } from "@supabase/auth-ui-react";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_ANON
);

const AuthUI = () => {
  const router = useRouter();
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/dashboard");
      }
    };
    checkSession();
  });

  supabase.auth.onAuthStateChange((event) => {
    if (event == "SIGNED_IN") {
      router.push("/dashboard");
    }
  });

  return (
    <div className="auth">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="light"
        providers={["github", "twitter"]}
        view="sign_in"
      />
    </div>
  );
};

export default AuthUI;