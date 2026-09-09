import { createApi } from "unsplash-js";

export const hasUnsplashAccessKey = Boolean(
  import.meta.env.VITE_UNSPLASH_ACCESS_KEY
);

export const unpslashApi = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY ?? "",
});
