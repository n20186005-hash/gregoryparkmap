import { defineMiddleware } from "astro:middleware";
export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  if (
    ["gregoryparkmap.com", "www.gregoryparkmap.com"].includes(url.hostname) &&
    (url.protocol !== "https:" || url.hostname !== "gregoryparkmap.com")
  ) {
    url.protocol = "https:";
    url.hostname = "gregoryparkmap.com";
    url.port = "";
    return new Response(null, {
      status: 301,
      headers: { Location: url.toString() },
    });
  }
  const response = await next();
  response.headers.set("Cache-Control", "no-store");
  if (
    response.status === 404 ||
    url.pathname === "/404" ||
    url.pathname === "/404/"
  ) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
    return new Response(response.body, {
      status: 404,
      headers: response.headers,
    });
  }
  return response;
});
