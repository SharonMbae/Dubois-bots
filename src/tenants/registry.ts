import fs from "fs";
import path from "path";
import { TenantConfig } from "./types";

const TENANTS_DIR = path.join(__dirname, "..", "..", "tenants");

function loadTenants(): TenantConfig[] {
  if (!fs.existsSync(TENANTS_DIR)) return [];
  return fs
    .readdirSync(TENANTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(TENANTS_DIR, f), "utf-8");
      return JSON.parse(raw) as TenantConfig;
    });
}

const tenants = loadTenants();
const byPhoneNumberId = new Map(tenants.map((t) => [t.phoneNumberId, t]));
const byId = new Map(tenants.map((t) => [t.id, t]));

export function getTenantByPhoneNumberId(phoneNumberId: string): TenantConfig | undefined {
  return byPhoneNumberId.get(phoneNumberId);
}

export function getTenantById(id: string): TenantConfig | undefined {
  return byId.get(id);
}

export function listTenants(): TenantConfig[] {
  return tenants;
}
