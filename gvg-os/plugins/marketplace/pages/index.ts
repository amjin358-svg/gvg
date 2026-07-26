import { getCatalogHome } from "../product";
import { MARKETPLACE_MODULES } from "../modules";

/** Root marketplace page loaders */

export async function MarketplaceHomePage() {
  const data = await getCatalogHome();
  return {
    title: "Marketplace",
    modules: MARKETPLACE_MODULES,
    ...data,
  };
}

export {
  ProductListPage,
  ProductDetailPage,
  CategoryListPage,
  CategoryDetailPage,
  BrandListPage,
  BrandDetailPage,
  FavoriteListPage,
  AiSearchPage,
} from "../product";

export { SupplierListPage, SupplierDetailPage } from "../supplier";

export { RfqListPage, RfqDetailPage, RfqCreatePage } from "../rfq";

export {
  ProcurementDeskPage,
  ProcurementDetailPage,
} from "../procurement";
