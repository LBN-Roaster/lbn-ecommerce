import { getCollections } from "lib/data/collections";
import { getProducts } from "lib/data/products";
import { locales } from "lib/i18n";
import { baseUrl, validateEnvironmentVariables } from "lib/utils";
import { MetadataRoute } from "next";

type Route = {
  url: string;
  lastModified: string;
};

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables();

  const routesMap = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date().toISOString(),
    },
  ]);

  const collectionsPromise = Promise.all(
    locales.map((locale) =>
      getCollections(locale).then((collections) =>
        collections.map((collection) => ({
          url: `${baseUrl}/${locale}${collection.path}`,
          lastModified: collection.updatedAt,
        })),
      ),
    ),
  ).then((r) => r.flat());

  const productsPromise = Promise.all(
    locales.map((locale) =>
      getProducts({ locale }).then((products) =>
        products.map((product) => ({
          url: `${baseUrl}/${locale}/product/${product.handle}`,
          lastModified: product.updatedAt,
        })),
      ),
    ),
  ).then((r) => r.flat());

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (
      await Promise.all([collectionsPromise, productsPromise])
    ).flat();
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...routesMap, ...fetchedRoutes];
}
