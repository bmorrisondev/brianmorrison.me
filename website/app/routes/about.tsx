import { redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return redirect("/work-with-me", {
    status: 301 // HTTP status code for permanent redirect
  });
};

// No need for a default export component since we're redirecting
