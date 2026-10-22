import { Router } from "express";
import { getTenantByPhoneNumberId } from "../tenants/registry";
import { routeIncomingMessage } from "../flows/router";

export const webhookRouter = Router();

webhookRouter.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.WEBHOOK_VERIFY_TOKEN) {
    res.status(200).send(challenge);
    return;
  }

  res.sendStatus(403);
});

webhookRouter.post("/webhook", async (req, res) => {
  res.sendStatus(200);

  const entry = req.body?.entry?.[0];
  const change = entry?.changes?.[0]?.value;
  const phoneNumberId = change?.metadata?.phone_number_id;
  const message = change?.messages?.[0];

  if (!phoneNumberId || !message) return;

  const tenant = getTenantByPhoneNumberId(phoneNumberId);
  if (!tenant) {
    console.warn(`No tenant configured for phone_number_id "${phoneNumberId}"`);
    return;
  }

  const from = message.from;
  const text = message.text?.body ?? "";

  try {
    await routeIncomingMessage(tenant, from, text);
  } catch (err) {
    console.error(`Error handling message for tenant "${tenant.id}":`, err);
  }
});
