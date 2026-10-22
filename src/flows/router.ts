import { TenantConfig } from "../tenants/types";
import { sendText } from "../whatsapp/client";
import { handleOrdersMessage } from "./orders";
import { handleSupportMessage } from "./support";

type ConversationState = "menu" | "orders" | "support";

const stateByUser = new Map<string, ConversationState>();

function stateKey(tenantId: string, from: string): string {
  return `${tenantId}:${from}`;
}

export async function routeIncomingMessage(tenant: TenantConfig, from: string, text: string): Promise<void> {
  const key = stateKey(tenant.id, from);
  const trimmed = text.trim().toLowerCase();

  if (trimmed === "menu" || trimmed === "hi" || trimmed === "hello") {
    stateByUser.set(key, "menu");
    await sendText(tenant, from, tenant.greeting);
    return;
  }

  const state = stateByUser.get(key) ?? "menu";

  if (state === "menu") {
    if (trimmed === "1") {
      stateByUser.set(key, "orders");
      await handleOrdersMessage(tenant, from, "");
      return;
    }
    if (trimmed === "2") {
      stateByUser.set(key, "support");
      await handleSupportMessage(tenant, from, "");
      return;
    }
    await sendText(tenant, from, tenant.greeting);
    return;
  }

  if (state === "orders") {
    await handleOrdersMessage(tenant, from, trimmed);
    return;
  }

  if (state === "support") {
    await handleSupportMessage(tenant, from, trimmed);
    return;
  }
}
