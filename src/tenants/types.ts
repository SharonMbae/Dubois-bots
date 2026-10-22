export interface CatalogItem {
  sku: string;
  name: string;
  priceKes: number;
}

export interface TenantConfig {
  id: string;
  displayName: string;
  greeting: string;
  logoUrl: string;
  phoneNumberId: string;
  accessTokenEnv: string;
  catalog: CatalogItem[];
}
