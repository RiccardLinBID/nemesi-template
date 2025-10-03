import { serve } from "@hono/node-server";
import { Hono } from "hono";
const app = new Hono();
function test(a) {
    console.info(a);
}
// function prova(a: any) {
//   console.info(a);
// }
app.get("/", (c) => {
    const pippo = test(5);
    console.log(pippo);
    return c.text("Hello Hono!");
});
serve({
    fetch: app.fetch,
    port: 3000,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
