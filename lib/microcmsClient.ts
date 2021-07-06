import { createClient } from "microcms";

export const microcmsClient = createClient({
  serviceDomain: "alephmemo",
  apiKey: `${Deno.env.get("X_API_KEY")}`,
});
