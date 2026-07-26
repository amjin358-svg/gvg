/** Marketplace product domain — products, categories, brands, favorites, AI search */

export type PluginRoute = {
  path: string;
  page: string;
  title: string;
  auth?: boolean;
};

export const productRoutes: PluginRoute[] = [
  {
    path: "/marketplace/products",
    page: "product/pages/ProductList",
    title: "Product",
  },
  {
    path: "/marketplace/products/[slug]",
    page: "product/pages/ProductDetail",
    title: "Product Detail",
  },
  {
    path: "/marketplace/categories",
    page: "product/pages/CategoryList",
    title: "Category",
  },
  {
    path: "/marketplace/categories/[slug]",
    page: "product/pages/CategoryDetail",
    title: "Category Detail",
  },
  {
    path: "/marketplace/brands",
    page: "product/pages/BrandList",
    title: "Brand",
  },
  {
    path: "/marketplace/brands/[slug]",
    page: "product/pages/BrandDetail",
    title: "Brand Detail",
  },
  {
    path: "/marketplace/favorites",
    page: "product/pages/FavoriteList",
    title: "Favorite",
    auth: true,
  },
  {
    path: "/marketplace/ai-search",
    page: "product/pages/AiSearch",
    title: "AI Search",
  },
];

export const productNavigation = [
  { label: "Products", href: "/marketplace/products" },
];

export const productPermissions = [
  "products.read",
  "products.write",
  "categories.read",
  "categories.write",
  "brands.read",
  "brands.write",
  "favorites.read",
  "favorites.write",
  "ai.search",
] as const;
