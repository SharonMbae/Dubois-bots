import { TenantConfig } from "../tenants/types";

const GRAPH_API_VERSION = "v21.0";

export async function sendText(tenant: TenantConfig, to: string, body: string): Promise<void> {
  const token = process.env[tenant.accessTokenEnv];
  if (!token) {
    throw new Error(`Missing access token env var "${tenant.accessTokenEnv}" for tenant "${tenant.id}"`);
  }

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${tenant.phoneNumberId}/messages`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body },
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`WhatsApp send failed for tenant "${tenant.id}": ${res.status} ${errBody}`);
  }
}
