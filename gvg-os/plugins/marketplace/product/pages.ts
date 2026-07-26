import {
  getBrandPage,
  getCatalogHome,
  getCategoryPage,
  getFavoritesPage,
  getProductPage,
  searchProducts,
} from "./services";

export async function ProductListPage() {
  const { products } = await getCatalogHome();
  return { title: "Product", products };
}

export async function ProductDetailPage(slug: string) {
  const product = await getProductPage(slug);
  return { title: product?.name ?? "Product", product };
}

export async function CategoryListPage() {
  const { categories } = await getCatalogHome();
  return { title: "Category", categories };
}

export async function CategoryDetailPage(slug: string) {
  const category = await getCategoryPage(slug);
  return { title: category?.name ?? "Category", category };
}

export async function BrandListPage() {
  const { brands } = await getCatalogHome();
  return { title: "Brand", brands };
}

export async function BrandDetailPage(slug: string) {
  const brand = await getBrandPage(slug);
  return { title: brand?.name ?? "Brand", brand };
}

export async function FavoriteListPage() {
  const data = await getFavoritesPage();
  return { title: "Favorite", ...data };
}

export async function AiSearchPage(query = "") {
  const results = query ? await searchProducts(query) : [];
  return { title: "AI Search", query, results };
}
