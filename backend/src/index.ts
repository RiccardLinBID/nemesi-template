import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { connectDB } from "../db.js";
import { Structure } from "../schema/structure.js";
import { NC } from "../schema/nc.js";
import { cors } from "hono/cors";
const app = new Hono();
await connectDB();

app.use("*", cors());

// function prova(a: any) {
//   console.info(a);
// }

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
// GET /ncs -> tutte le NC
app.get("/ncs", async (c) => {
  try {
    const ncs = await NC.find().populate("structure");
    return c.json(ncs);
  } catch (err) {
    console.log(err);
    return c.json({ error: "Errore nel recuperare le NC" }, 500);
  }
});

// GET /structures -> tutte le strutture (con populate opzionale)
app.get("/structures", async (c) => {
  try {
    const structures = await Structure.find().populate("ncList");
    return c.json(structures);
  } catch (err) {
    console.log(err);
    return c.json({ error: "Errore nel recuperare le strutture" }, 500);
  }
});

// GET /structures/:id/ncs -> NC di una specifica struttura
app.get("/structures/:id/ncs", async (c) => {
  try {
    const { id } = c.req.param();
    const structure = await Structure.findById(id).populate("ncList");
    if (!structure) {
      return c.json({ error: "Struttura non trovata" }, 404);
    }
    return c.json(structure.ncList);
  } catch (err) {
    console.log(err);
    return c.json(
      { error: "Errore nel recuperare le NC della struttura" },
      500
    );
  }
});
serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
