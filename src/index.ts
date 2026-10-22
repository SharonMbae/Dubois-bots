import "dotenv/config";
import express from "express";
import { webhookRouter } from "./routes/webhook";
import { listTenants } from "./tenants/registry";

const app = express();
app.use(express.json());
app.use(webhookRouter);

app.get("/", (_req, res) => {
  res.send("duruma-bot is running");
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(port, () => {
  console.log(`duruma-bot listening on port ${port}`);
  console.log(`Loaded tenants: ${listTenants().map((t) => t.id).join(", ") || "(none)"}`);
});
