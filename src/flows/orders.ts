import { TenantConfig } from "../tenants/types";
import { sendText } from "../whatsapp/client";

export async function handleOrdersMessage(tenant: TenantConfig, from: string, text: string): Promise<void> {
  if (!text) {
    const lines = tenant.catalog.map((item, i) => `${i + 1}. ${item.name} - KES ${item.priceKes}`);
    await sendText(
      tenant,
      from,
      `Here's our catalog:\n${lines.join("\n")}\n\nReply with the item number to order, or "menu" to go back.`
    );
    return;
  }

  const index = parseInt(text, 10) - 1;
  const item = tenant.catalog[index];

  if (!item) {
    await sendText(tenant, from, `Sorry, I didn't get that. Reply with a valid item number, or "menu" to go back.`);
    return;
  }

  await sendText(
    tenant,
    from,
    `Great, you'd like "${item.name}" for KES ${item.priceKes}. Payment and order confirmation coming soon. Reply "menu" to go back.`
  );
}
