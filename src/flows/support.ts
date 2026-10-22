import { TenantConfig } from "../tenants/types";
import { sendText } from "../whatsapp/client";

export async function handleSupportMessage(tenant: TenantConfig, from: string, text: string): Promise<void> {
  if (!text) {
    await sendText(
      tenant,
      from,
      `You're through to ${tenant.displayName} support. Describe your issue and we'll help, or reply "menu" to go back.`
    );
    return;
  }

  await sendText(
    tenant,
    from,
    `Thanks, we've logged your message: "${text}". A team member will follow up. Reply "menu" to go back.`
  );
}
