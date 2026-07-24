import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
  try {
    const session = await fetch("/api/auth/get-session", {
      headers: {
        cookie: cookies.toString(),
      },
    }).then((res) => res.json());

    console.log("Session in admin layout:", session);

    if (!session || !session.user) {
      console.log("Not authenticated, redirecting to login");
      redirect(303, "/login");
    }

    console.log("Authenticated, returning session");
    return { session };
  } catch (error) {
    console.log("Error getting session:", error);
    redirect(303, "/login");
  }
};
