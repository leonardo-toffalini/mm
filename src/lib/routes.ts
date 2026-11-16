export const routes = {
  home: "/",
  collection: "/collection",
  gown: (slug: string) => `/collection/${slug}`,
  booking: "/book",
} as const;
